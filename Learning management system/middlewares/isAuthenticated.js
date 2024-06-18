const jwt = require('jsonwebtoken')
const Admin = require('../Models/Staff/adminModel')


const authenticateAdmin = async(req,res,next)=>{
    const token = req.cookies.adminToken
    if(!token){
        throw new Error(`please login to continue`)
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Admin.findById(decodedToken.id).select('id name email role')
        req.adminAuth = user
        console.log(req.adminAuth)
        next()
    } catch (error) {
        throw new Error('Login expired, please login')
    }
}

const authorizeAdmin = async(req,res,next)=>{
        if(req.adminAuth.role !== 'Admin') {
            throw new Error(`you are not allowed to access this route`)
    }
    next()
}

module.exports = {authenticateAdmin, authorizeAdmin}