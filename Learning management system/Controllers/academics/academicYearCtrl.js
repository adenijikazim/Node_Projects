const {StatusCodes}  = require('http-status-codes')
const AcademicYear = require('../../Models/academic/academicYear')
const Admin = require('../../Models/Staff/adminModel')

const createAcademicYear = async(req,res)=>{
    const {name, fromYear, toYear} = req.body
    const academicYear = await AcademicYear.findOne({name})
    if(academicYear){
        throw new Error('Academic year already exists')
    }
    const academicYearCreated = await AcademicYear.create(
        {name,
        fromYear,
        toYear,
        createdBy:req.adminAuth.id})

        // push academic years into admin
        const admin = await Admin.findById(req.adminAuth._id)
        admin.academicYears.push(academicYearCreated._id)
        await admin.save()
    res.status(StatusCodes.CREATED).json({
        message:'aademic year successfully created',
        data:academicYearCreated
    })
}

const getAcademicYears = async(req,res)=>{
    const academicYears = await AcademicYear.find().select('-password')
    res.status(StatusCodes.OK).json({
        message:'academic year fetched successfully',
        data:academicYears
    })
}

const getAcademicYear = async(req,res)=>{
    const academicYear = await AcademicYear.findById({_id:req.params.id})
    if(!academicYear){
        throw new Error('academic year does not exist')
    }
    res.status(StatusCodes.OK).json({
        message:'success',
        data:academicYear
    })
}

const updateacademicYear = async(req,res)=>{
    const {name,fromYear,toYear} = req.body
    const academicYear = await AcademicYear.findByIdAndUpdate({_id:req.params.id},
        {name,fromYear,toYear,createdBy:req.adminAuth.id},
        {runValidators:true, new:true})
    res.status(StatusCodes.OK).json({
        message:'academic year successfully updated',
        data:academicYear
    })

}

const deleteAcademicYear = async(req,res)=>{
    await AcademicYear.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({
        status:'success',
        message:'academic year deleted successfully'
    })


}

module.exports = {
    createAcademicYear,
    getAcademicYears,
    updateacademicYear,
    deleteAcademicYear,
    getAcademicYear}