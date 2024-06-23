const jwt = require('jsonwebtoken')
const { model } = require('mongoose')


const isAuthenticated =model=>{
    return async(req,res,next)=>{
        const token = req.cookies.token
        if(!token){
            throw new Error(`please login to continue`)
        }
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const user = await model.findById(decodedToken.id).select('id name email role')
            req.userAuth = user
            console.log(req.userAuth)
            next()
        } 
        
        catch (error) {
            throw new Error('Login expired, please login')
        }
    }

}


const isAuthorized=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.userAuth.role)){
            throw new Error('You dont have the permission to perform this operatio')
        }
    }
}


module.exports = {
    isAuthenticated, isAuthorized
}