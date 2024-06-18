const jwt = require('jsonwebtoken')
const customError = require('../utils/customError')
const User = require('../models/userModel')


const authenticateUser = async(req,res,next)=>{
    const token = req.cookies.token
    console.log(token)
    if(!token){
        const error = new customError('Kindly login to continue', 401)
        return next(error)
    }  

    try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.id).select('name email role')
    req.user = user
    console.log(req.user)        

    next()
    }
     catch (err) {
        const error = new customError('Authentication Invalid', 500)
        return next(error)

    }
}

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