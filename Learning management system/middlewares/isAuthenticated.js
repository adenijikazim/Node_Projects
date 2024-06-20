const jwt = require('jsonwebtoken')
const Admin = require('../Models/Staff/adminModel')
const Teacher = require('../Models/Staff/teachers')
const Student = require('../Models/academic/student')


const authenticateUser = async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        throw new Error(`please login to continue`)
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken)
        let user;
        if(decodedToken.role === 'Admin'){
        user = await Admin.findById(decodedToken.id).select('_id email role')}
        else if(decodedToken.role === 'Teacher'){
            user = await Teacher.findById(decodedToken.id).select('_id email role')}
            else if(decodedToken.role === 'Student'){
                user = await Student.findById(decodedToken.id).select('_id email role')}
        // req.userAuth = user
        req.userAuth = {
            id: decodedToken.id,
            role: decodedToken.role
          };
        console.log(req.userAuth)
        next()
    } catch (error) {
        throw new Error('Login expired, please login')
    }
}

const authorizeUser = role=>{
    return (req,res,next)=>{
        if(req.userAuth.role !== role) {
            throw new Error(`you are not allowed to access this route`)
        }
        next()
    }
}

module.exports = {authenticateUser, authorizeUser}