const {StatusCodes} = require('http-status-codes')
const Teacher = require('../../Models/Staff/teachers')
const jwt = require('jsonwebtoken')
const Admin = require('../../Models/Staff/adminModel')

// admin register teacher
const registerTeacher = async(req,res)=>{
    const {name,email,password}= req.body
    //  find admin
    const adminFound = await Admin.findById(req.userAuth.id)
    if(!adminFound){
        throw new Error('admin not found')
    }
    const teacherFound = await Teacher.findOne({email})
    if(teacherFound){
        throw new Error('teacher already registered')

    }
    const teacherCreated = await Teacher.create({name,email,password,createdBy:req.userAuth.id})
    const token = jwt.sign({id:teacherCreated._id,role:teacherCreated.role}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES})
    const oneDay = 1000*60*60*24
    res.cookie('token', token,{
        // secure:true,
        httpOnly:true,
        expires:new Date(Date.now()+oneDay)
    })
    teacherCreated.password = undefined

    // push teachers into admin
    adminFound.teachers.push(teacherCreated._id)
    await adminFound.save()
    res.status(StatusCodes.CREATED).json({
        message:"teacher registered successfully",
        data:teacherCreated
    })


}

const LoginTeacher=async(req,res)=>{
    const {email, password}=req.body
    if(!email || !password){
        throw new Error('please provide email and password')
    }
    const teacher = await Teacher.findOne({email})
    if(!teacher){
        throw new Error('Invalid login details')
    }
    const comparePassword = teacher.comparePassword(password)
    if(!comparePassword){
        throw new Error('Invalid login details')
    }
    teacher.password=undefined
    const token = jwt.sign({id:teacher._id,role:teacher.role}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES})
    const oneDay = 1000*60*60*24
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now()+oneDay) 
    })

    res.status(StatusCodes.CREATED).json({
        message:"You are logged in",
        data:teacher
    })

}

const getAllTeachersAdmin = async(req,res)=>{
    const teachers = await Teacher.find().select('-password')
    res.status(StatusCodes.OK).json({
        message:'Teachers fetched successfully',
        data:teachers
    })

}

const getTeacherByAdmin = async(req,res)=>{
    const teacherID = req.params.teacherID
    const teacher = await Teacher.findById(teacherID).select('-password')
    if(!teacher){
        throw new Error('teacher not found')
    }
    res.status(StatusCodes.OK).json({
        message:'teacher fetched successfully',
        data:{teacher}
    })
}

const getTeacherProfile = async(req,res)=>{
    const teacher = await Teacher.findById(req.userAuth.id).select('-password')
    if(!teacher){
        throw new Error('No teacher found')
    }
    res.status(StatusCodes.OK).json({
        message:"profiles fetched successfully",
        data:teacher
    })
    // console.log('Hello world')
}

const teacherUpdateProfile = async(req,res)=>{
    const {name,email} = req.body
    
    const teacher = await Teacher.findByIdAndUpdate(req.userAuth.id, {name,email}, {runValidators:true,new:true})
    teacher.password = undefined
    res.status(StatusCodes.OK).json({
        message:'profile updated successfully',
        data:teacher
    })

}

const adminUpdateTeacher=async(req,res)=>{
    const teacher = await Teacher.findByIdAndUpdate(req.params.teacherID,req.body,{runValidators:true,new:true}).select('-password')
    if(!teacher){
        throw new Error(`No teacher found for the id ${req.params.teacherID}`)
    }
    res.status(StatusCodes.OK).json({
        teacher
    })
}

const adminDeleteTeacher = async(req,res)=>{
    await Teacher.findByIdAndDelete(req.params.teacherID)
    res.status(StatusCodes.OK).json('teacher has been deleted')

}

module.exports ={
    registerTeacher,getTeacherByAdmin,
    getAllTeachersAdmin,teacherUpdateProfile,LoginTeacher,
    getTeacherProfile,adminDeleteTeacher,adminUpdateTeacher
}