const {StatusCodes} = require('http-status-codes')
const YearGroup = require('../../Models/academic/yearGroup')
const Admin = require('../../Models/Staff/adminModel')

const createYearGroup = async(req,res)=>{
   const {name,academicYear} = req.body
   const yearGroupFound = await YearGroup.findOne({name})
   if(yearGroupFound){
    throw new Error('year Group name already exists')
   }
   const yearGroup = await YearGroup.create({name,academicYear,createdBy:req.adminAuth._id})
   const admin = await Admin.findById(req.adminAuth._id)
   admin.yearGroups.push(yearGroup._id)
   await admin.save()
   res.status(StatusCodes.OK).json({
    message:"year group successfully created",
    data:yearGroup
   })

}

const getYearGroups = async(req,res)=>{
    const yearGroups = await YearGroup.find()
    res.status(StatusCodes.OK).json({
        message:"Year Group fetched successfully",
        data:yearGroups
    })

}

const getYearGroup = async(req,res)=>{
    const yearGroup = await YearGroup.findById(req.params.id)
    if(!yearGroup){
        throw new Error(`No year group found for the id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({
        message:'year group fetched successfully',
        data:yearGroup
    })


}

const updateYearGroup = async(req,res)=>{
    const {name,academicYear } = req.body
    const yearGroup = await YearGroup.findByIdAndUpdate(req.params.id, 
        {name,academicYear, createdBy:req.adminAuth._id},
        {runValidators:true, new:true})
        res.status(StatusCodes.OK).json({
            message:"year Group updated successfully",
            data:yearGroup
        })


}

const deleteYearGroup = async(req,res)=>{
    await YearGroup.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({
        message:"message deleted successfully"
    })

}

module.exports = {createYearGroup,getYearGroups,getYearGroup,updateYearGroup,deleteYearGroup}