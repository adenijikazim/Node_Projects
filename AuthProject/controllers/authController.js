const User = require("../models/usersmodel")
const generateOtp = require("../utilities/generateOtp")
const jwt = require('jsonwebtoken')
const generateToken = function(id){
    return jwt.sign(id, 'process.env.JWT_SECRET', {expiresIn:'process.env.JWT_EXPIRES'})
}

const signup =async (req,res)=>{
    const {email, password,userName,confirmPassword} = req.body
    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists){
        return next(new AppError('email already exists', 400))
    }
    const otp = generateOtp()
    const otpExpires = Date.now() +24*60*60*1000
    const user = User.create(req.body,otp,otpExpires)
    const token= generateToken(user._id)
    res.cookie('token', token, {
        httpOnly:true,
        maxAge:24*60*60*1000
    })

    user.password = undefined
    user.otp = undefined
    res.status(201).json({
        status:"success",
        message:"User created",
        data:{user}
    })

}

const login = (req,res)=>{

}

module.exports = {signup,login}