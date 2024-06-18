const jwt = require('jsonwebtoken')
const Teacher = require('../Models/Staff/teachers')



const authenticateTeacher  = async(req,res,next)=>{
    const token = req.cookies.teacherToken
    if(!token){
        throw new Error('kindly login to access this route')
    
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Teacher.findById(verifiedToken.id).select('id name email role')
        req.teacherAuth = user
        next()
    } catch (error) {
        throw new Error('invalid token or token expires!')
        
    }

} 

const authorizeTeacher = async(req,res,next)=>{
    if(req.teacherAuth.role !== 'teacher'){
        throw new Error('access not allowed! Teachers only')
    }

    next()

}


module.exports = {authenticateTeacher, authorizeTeacher}