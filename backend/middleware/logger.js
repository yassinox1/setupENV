//@desc  Logs request to console
const logger = (req,res,next)=>{
    console.log('Moddleware ran');
    next();
}

module.exports = logger;