const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
      },
      email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
      },
      hash: String,
      salt: String,
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },
      avatar : {
          type : String
      },    
      resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now
      }
})

UserSchema.methods.generateHash = function(entredPassword){

  this.salt = crypto.randomBytes(256).toString('hex');
  this.hash = crypto.pbkdf2Sync(entredPassword, this.salt,10000,512, 'sha512').toString('hex');

  return this.hash;
}
 
 
UserSchema.pre('save',async function(next){

    if(!this.isModified('password')){
      next(); 
    }
 
  this.password = this.generateHash(this.password);
})



// Match User entred Password to HAched Password in Database
UserSchema.methods.matchPassword=   function(entredPassword){
  //return await bcrypt.compare(entredPassword,this.password)
  var hash = crypto.pbkdf2Sync(entredPassword, this.salt,10000,512, 'sha512').toString('hex');
  return this.hash === hash;
}

//Sign Token

UserSchema.methods.getSignedJwtToken = function(){
  const payload = { id: this._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn : process.env.JWT_EXPIRE
  });
  return token;
}

// Reset Token Password && Generate and hash Paassword Token
UserSchema.methods.getRestPasswordToken =  function(){

 
    const resetToken = 'zsagdhbjdcbdj12121';
 
    this.resetPasswordToken = this.generateHash(resetToken);
 
    // Set the Expire Field 
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User',UserSchema)