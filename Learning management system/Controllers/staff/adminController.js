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
    const compare =await admin.comparePassword(password)
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
    const admin = await Admin.findById(req.userAuth.id)
    .select('-password')
    .populate('academicTerms')
    .populate('academicYears')
    // .populate('programs')
    // .populate('yearGroups')
    .populate('classLevels')
    // .populate('students')
        if(!admin){
            const error = new Error(`Admin not found`)
        }
        res.status(StatusCodes.OK).json({admin})
}


////// GET ALL ADMINS /////

const getAllAdmins = async(req,res)=>{
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const skip = (page - 1) * limit
    const total = await Admin.countDocuments()
    const admins = await Admin.find()
    .skip(skip)
    .limit(limit)
    .select('-password')
    res.status(StatusCodes.OK).json({
        total,
        results:admins.length,
        message:'admin fetched successfully',
        data:admins
    })
}


// UPDATE ADMIN
const updateAdmin = async(req,res)=>{
    const {name,email} = req.body
    const admin = await Admin.findByIdAndUpdate(req.userAuth.id, {name,email},{runValidators:true, new:true})
    admin.password=undefined
    res.status(StatusCodes.OK).json({
        message:'successfully updated',
        data:admin
    })

}

const deleteAdmin = async(req,res)=>{
    await Admin.findByIdAndDelete(req.params.id, {createdBy:req.userAuth.id})
    res.status(StatusCodes.OK).json({
        message:'admin deleted successfully'
    })

}


const updateAdminPassword = async(req,res,next)=>{
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        const error = new Error('please enter old and new password')
        return next(error)
    }
    const admin = await Admin.findById(req.userAuth.id)
    if(!admin){
        const error = new Error(`No user with the id ${req.userAuth.id}`)
        return next(error)
    }
    const isPasswordCorrect =await admin.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        const error = new Error(`Incorrect password`)
        return next(error)
    }

    admin.password = newPassword
    await admin.save()
    res.status(StatusCodes.OK).json({message:'password changed successfully'})
}


module.exports= {
    register,
    getAllAdmins,
    login,
    getAdminProfile,
    updateAdmin,
    deleteAdmin,
    updateAdminPassword
   
}