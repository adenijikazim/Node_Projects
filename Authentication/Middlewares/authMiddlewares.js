const jwt = require('jsonwebtoken')
const customError = require('../utils/customError')
const Token = require('../models/token')

const authenticateUser =async (req,res,next)=>{
    const {accessToken, refreshToken} = req.cookies

    if(!accessToken){
        const error = new customError('Kindly login to continue', 401)
        return next(error)
    }  

    try {
        // check for access token and verify else check for refresh token 
        if(accessToken){
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = decodedToken
        console.log(decodedToken)        
        return next()
    }
        // check for refresh token and verify

        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
        const existingToken = await Token.findOne({
            user:payload.user.userId,
            refreshToken:payload.refreshToken
        })
        if(!existingToken || !existingToken.isValid){
        const error = new customError('Authentication Invalid', 500)
        return next(error)
        }

        const fourDays = 60*60*24*4*1000
        res.cookie('accessToken',accessTokenJWT, {
            httpOnly:true,
            // secure:true,
            // expires:new Date(Date.now()+fourDays)
            maxAge:1000
        })
        
        res.cookie('refreshToken',refreshToken, {
            httpOnly:true,
            expires:new Date(Date.now()+fourDays)
        })


        req.user = payload.user
    
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