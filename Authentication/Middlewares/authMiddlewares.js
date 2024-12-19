const jwt = require('jsonwebtoken')
const customError = require('../utils/customError')
// const Token = require('../models/token')
const User = require('../models/userModel')

const authenticateUser =async (req,res,next)=>{
    const {accessToken, refreshToken} = req.cookies
    console.log(accessToken,refreshToken)
 
    try {
        // check for access token and verify else check for refresh token 
        if(accessToken){
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        const user = await User.findById(payload.id).select('name email role')
    
        req.user = user
        return next()}
        
        console.log('we are here')
        /*else{
        // check for refresh token and verify
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
        console.log(`refresh: ${payload}`)
        const existingToken = await Token.findOne({
            user:payload.id,
            refreshToken:payload.refreshToken
        })
        console.log(existingToken)

        if(!existingToken || !existingToken.isValid){
        const error = new customError('Authentication Invalid', 500)
        return next(error)
        }
        const user = await User.findById(payload.id).select('name email role')
        const accessTokenJWT = getToken({id:user._id})

        const fourDays = 60*60*24*4*1000
        res.cookie('accessToken',accessTokenJWT, {
            httpOnly:true,
            // secure:true,
            // expires:new Date(Date.now()+fourDays)
            maxAge:1000*24*60*60
        })
        
        res.cookie('refreshToken',existingToken.refreshToken, {
            httpOnly:true,
            maxAge  :fourDays
        })
        req.user = payload.user
        next()}*/
    
    }

     catch (err) {
        const error = new customError('Authentication Invalid', 500)
        return next(error)

    }
}
// const authenticateUser = (req,res,next)=>{
//     const token = req.cookies.token
//     console.log(token)
//     if(!token){
//         const error = new customError('Kindly login to continue', 401)
//         return next(error)
//     }  

//     try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = decodedToken
//     console.log(decodedToken)        

//     next()
//     }
//      catch (err) {
//         const error = new customError('Authentication Invalid', 500)
//         return next(error)

//     }
// }

const authorizeUser= (role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            const error = new customError('You are not authorized to acess this route',401)
            return next(error)
        }
        next()
    }
   
}

module.exports = {authenticateUser,authorizeUser}