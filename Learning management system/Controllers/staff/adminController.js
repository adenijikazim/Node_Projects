const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Admin = require('../../Models/Staff/adminModel')


// @desc register admin 
// @route api/v1/lms/register 
const register = async(req,res)=>{
    const {name,email,password} = req.body
    const adminExists = await Admin.findOne({email})
    if(adminExists){
        throw new Error('admin already registered')
    }
    const admin = await Admin.create({name,email,password})
    const token = jwt.sign({id:admin._id,role:admin.role}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES})
    const oneDay = 1000*60*60*24
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay)
    })
    admin.password = undefined
    res.status(StatusCodes.CREATED).json({message:'admin has been registered', data:admin})
}

// @desc Login admin
// @route api/v1/lms/login
const login = async(req,res)=>{
    const {email,password} = req.body
    const admin = await Admin.findOne({email})
    if(!admin){
        throw new Error('Admin does not exist')
    }
    const compare = admin.comparePassword(password)
    if(!compare){
        throw new Error('Incorrect email or password')
    }
   
    const token = jwt.sign({id:admin._id,role:admin.role}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES})
    const oneDay = 1000*60*60*24
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay)
    })
    res.status(StatusCodes.OK).json({
        message:`${admin.name} has successfully logged in`
    })
}

// @desc get admin profile

const getAdminProfile = async(req,res)=>{
    const admin = await Admin.findById(req.adminAuth._id)
    .select('-password')
    .populate('academicTerms')
    .populate('academicYears')
    // .populate('programs')
    // .populate('yearGroups')
    .populate('classLevels')
    // .populate('students')
        if(!admin){
            const error = new error(`Admin not found`)
        }
        admin.password = undefined
        res.status(StatusCodes.OK).json({admin})
}


////// GET ALL ADMINS /////

const getAllAdmins = async(req,res)=>{
    const admins = await Admin.find().select('-password')
    res.status(StatusCodes.OK).json({
        message:'admin fetched successfully',
        count:admins.length,
        data:admins
    })
}


// UPDATE ADMIN
const updateAdmin = async(req,res)=>{
    const {name,email} = req.body
    const admin = await Admin.findByIdAndUpdate(req.adminAuth._id, {name,email},{runValidators:true, new:true})
    admin.password=undefined
    res.status(StatusCodes.OK).json({
        message:'successfully updated',
        data:admin
    })

}

const deleteAdmin = async(req,res)=>{
    await Admin.findByIdAndDelete(req.params.id, {createdBy:req.adminAuth._id})
    res.status(StatusCodes.OK).json({
        message:'admin deleted successfully'
    })

}

const adminSuspendTeacher = async(req,res)=>{

}
const adminUnSuspendTeacher = async(req,res)=>{

}
const adminWithdrawTeacher = async(req,res)=>{

}
const adminUnwithdrawTeacher = async(req,res)=>{

}

const adminpublishExamResult = async(req,res)=>{

}
const adminUnpublishExamResult = async(req,res)=>{

}

module.exports= {
    register,
    getAllAdmins,
    login,
    getAdminProfile,
    updateAdmin,
    deleteAdmin,
    adminSuspendTeacher,
    adminUnSuspendTeacher,
    adminWithdrawTeacher,
    adminUnwithdrawTeacher,
    adminpublishExamResult,
    adminUnpublishExamResult
}