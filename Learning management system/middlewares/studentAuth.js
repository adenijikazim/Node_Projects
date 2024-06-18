const jwt = require('jsonwebtoken')
const Student = require('../Models/academic/student')


const authenticateStudent = async(req,res,next)=>{
    const token = req.cookies.studentToken
if(!token){
    throw new Error('kindly login to access this route')
}

try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user =await Student.findById(verifiedToken.id).select('id name email role')
    req.studentAuth = user
    console.log(req.studentAuth)
    next()
} catch (error) {
    throw new Error('token expired/Invalid')
}}

const authorizeStudent=async(req,res,next)=>{
    if(req.studentAuth.role !== 'Student'){
        throw new Error('you are not authorize to access this route')
    }
    next()

}



module.exports = {authenticateStudent,authorizeStudent}