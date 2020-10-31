const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
 
const crypto = require('crypto');
const gravatar = require('gravatar')

// Load Input Validation
const validateLoginInput = require('../validation/login');

// @desc   Register New User
// @route  POST /api/v1/auth/register
// access  Public
exports.register =  asyncHandler( async(req,res,next)=>{

    const {name,email,password,role} = {...req.body}
    
    const user = await User.findOne({email});

    if(user){
       
        next(new ErrorResponse('User Aleardy Exist'),400)
    }

    const avatar = gravatar.url(email,{
        s : '200', // Size
        r : 'pg', // rating
        d : 'mm' // default
    });

    // Create New User
   const newUser = await User.create(
       {
           name,
           email,
           password,
           role,
           avatar
        }
       )
    //Create Token
   sendTokenResponse(newUser,200,res);

})

// @desc   Login User && Returning JWT Token
// @route  POST /api/v1/auth/login
// access  Public
exports.login =  asyncHandler( async(req,res,next)=>{

    const {email,password} = {...req.body}

    // Validation
    const {errors,isValid} = validateLoginInput({email,password})
    console.log(errors);
    if(isValid){
        console.log(errors);
       // return  next(new ErrorResponse(({errors}),400));
        return res.status(400).json({
            errors
        });
        
      }
    const user = await User.findOne({email}).select('+password');
 
    if(!user){

        errors.email= 'User Not Exist';
        
        //return next(new ErrorResponse(errors.email),400)
        return res.status(400).json({
            errors
        });
    }

    //Check if Password Matched
    const isMatchPassword = user.matchPassword(password);
    if(!isMatchPassword){
        errors.password = 'Incorect Password'
     // return   next(new ErrorResponse(errors.password),400)
     return res.status(400).json({
        errors
    });
    } 
    
    sendTokenResponse(user,200,res);

})

// @desc   Logout  User / clear cookie
// @route  GET /api/v1/auth/logout
// access  Private

exports.logout =  asyncHandler( async(req,res,next)=>{
    
    res.cookie('token', 'none',
    {
        expires : new Date(Date.now()+ 10 * 1000),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        data : {}
    })
});

// @desc   Get Current USer
// @route  GET /api/v1/auth/me
// access  Private
exports.getMe =  asyncHandler( async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        data : user
    })
});

// @desc   Forget Password
// @route  POST /api/v1/auth/forgetpassword
// access  Public
exports.forgetPassword =  asyncHandler( async(req,res,next)=>{
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorResponse(`Not User with that Email`,404));
    }

    // Get reset Token
    const restToken = user.getRestPasswordToken();
     
    await user.save({validateBeforeSave : false});

    //Create ResetUrl
    const ResetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${restToken}`;
    const message = `Please Make to \n\n ${ResetUrl}`;

    try {
        await sendEmail({
            email : user.email,
            subject : 'Password <reset Token',
            message
        });

        res.status(200).json({
            success : true,
            data : 'Email Sent'
        })
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave : false});

        return next(new ErrorResponse(`Email Could Not be Set`,500))
    }
    


    res.status(200).json({
        success : true,
        data : user
    })
});


// @desc   Reset Password
// @route  PUT /api/v1/auth/resetpassword/:resettoken
// access  Public
exports.resetPassword=  asyncHandler( async(req,res,next)=>{

    // get Hached Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken)
    .digest('hex');

    const user = await User.findOne(
        {
            resetPasswordToken,
            resetPasswordExpire : {$gt : Date.now()}
        }
        );

    if(!user){
        return next(new ErrorResponse(`Invalid Token`,400));
    }
    // Set new Password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user,200,res);
});



// Get Token From Model and create Cookie and send response
const sendTokenResponse = (user,statusCode,res)=>{
    
    const token = user.getSignedJwtToken();

    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly : true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    }

    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success : true,
        token 
    });


}

