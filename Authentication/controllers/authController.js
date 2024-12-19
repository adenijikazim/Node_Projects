const {StatusCodes} = require('http-status-codes')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const customError = require('../utils/customError')
const Token = require('../models/token')
const { getToken } = require('../utils/getCookie')


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
    const accessTokenJWT = getToken({id:user._id})
        const fourDays = 60*60*24*7
        res.cookie('accessToken', accessTokenJWT,{
            httpOnly:true,
            // secure:true,
            // expires:new Date(Date.now()+oneDay),
            maxAge:24*60*60*1000 //1day
        })

    res.status(StatusCodes.CREATED).json({
        status:"success",
        data:{
            user
        }
    })


}


// LOGIN USER
const login = async(req,res,next)=>{
    const fourDays = 60*60*24*4*1000
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(!user){
        const error = new customError('Invalid login credentials', 401)
        return next(error)
    }

    const compare =await user.comparePassword(password)
    if(!compare){
        const error = new customError('Incorrect email or password', 401)
        return next(error)
    }
    // const userData={name:user.name,user:user.email, role:user.role}
    const accessTokenJWT = getToken({id:user._id})

        // create refresh token 
        let refreshToken = ''

        // check for existing token 

        const existingToken = await Token.findOne({user:user._id})
        if(existingToken){
            const {isValid} = existingToken
            if(!isValid){
                const error = new customError('Invalid login credentials', 401)
                return next(error)
            }
            refreshToken = existingToken.refreshToken
            res.cookie('refreshToken',refreshToken, {
                httpOnly:true,
                maxAge:fourDays
            })
            res.status(StatusCodes.OK).json({user})
            return

        }
            
           
        refreshToken = crypto.randomBytes(40).toString('hex')
        const userAgent = req.headers['user-agent']
        const ip = req.ip

        const userToken = {refreshToken,userAgent,ip,user:user._id}
         await Token.create(userToken)

        res.cookie('accessToken',accessTokenJWT, {
            httpOnly:true,
            // secure:true,
            // expires:new Date(Date.now()+fourDays)
            maxAge:1000
            // maxAge:1000*24*60*60
        })
        
        res.cookie('refreshToken',refreshToken, {
            httpOnly:true,
           maxAge:4*24*60*60*1000
        })
    res.status(StatusCodes.OK).json({user:user})
}



const logout = async (req,res)=>{
    res.cookie('accessToken', 'logout',{
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