const {StatusCodes} = require('http-status-codes')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const customError = require('../utils/customError')


// REGISTER USER
const register = async(req,res,next)=>{
    const {name,email,password,confirmPassword,role} = req.body
    if(!name || !email || !password || !confirmPassword){
        const error = new customError('please enter all required fields', 401)
        return next(error)
    }

    const emailAlreadyRegistered = await User.findOne({email})
    if(emailAlreadyRegistered){
        const error= new customError('User already Registered')
        return next(error)
    }
    const user = await User.create({name,email,password,confirmPassword,role})
    const userData = {name:user.name, email:user.email, role:user.role}
    const token = jwt.sign(userData,
         process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE})
        const fourDays = 1000*60*60*24*4
        res.cookie('token', token,{
            httpOnly:true,
            // secure:true,
            expires:new Date(Date.now()+fourDays),
        })

    res.status(StatusCodes.CREATED).json({
        status:"success",
        data:{
            userData
        }
    })


}


// LOGIN USER
const login = async(req,res,next)=>{
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(!user){
        const error = new customError('Invalid login credentials', 401)
        return next(error)
    }

    const compare = user.comparePassword(password)
    if(!compare){
        const error = new customError('Incorrect email or password', 401)
        return next(error)
    }
    const userData={name:user.name,user:user.email, role:user.role}
    const token = jwt.sign(userData, process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE})

        const fourDays = 60*60*24*4*1000
        res.cookie('token',token, {
            httpOnly:true,
            // secure:true,
            expires:new Date(Date.now()+fourDays)
        })
    res.status(StatusCodes.OK).json({user:userData})
}

const logout = async (req,res)=>{
    res.cookie('token', 'logout',{
        httpOnly:true,
        expires:new Date(Date.now()+5*1000),
    })
    res.status(StatusCodes.OK).json({msg:"user has logged out"})


}





const forgotPassword = async(req,res)=>{
    const {email} = req.body
    if(!email){
        const error = new customError('kindly provide email')
    }

    const user = await User.findOne({email})
   if (user){
    // GENERATE RESET TOKEN
    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave:false})

    // SEND EMAIL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword:${resetToken}`
    const message=`We have received a password reset request, please usee the below link to reset your password,\n\n${resetUrl}\n\n this link will be valid for 10minutes`


        await sendEmail({
                email:user.email,
                subject:'Password reset link',
                message
            })
        res.status(StatusCodes.OK).json({
                message:'password reset link has been sent to your email'
        })
    } 
}
const resetPassword = async(req,res)=>{
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({passwordResetToken:token, passwordResetTokenExpires:{gt:Date.now()}})

    if(!user){
        const error = new customError('link is invlaid or has expired', 400)
        return next(error)
    }

    user.password = password
    user.confirmPassword = confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined

    user.save()

    res.status(StatusCodes.OK).json({message:'password changed succefully'})


}

module.exports={
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
}