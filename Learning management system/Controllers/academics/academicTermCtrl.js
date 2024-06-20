const {StatusCodes} = require('http-status-codes')
const AcademicTerm = require('../../Models/academic/academicTerm')
const Admin = require('../../Models/Staff/adminModel')


const createAcademiTerm = async(req,res)=>{
    const {name,description,duration} = req.body
    const academicTermFound = await AcademicTerm.findOne({name})
    if(academicTermFound){
        throw new Error(`Academic Term already exist`)
    }
    const academicTermCreated = await AcademicTerm.create({name,description,duration,createdBy:req.adminAuth._id})
    const admin = await Admin.findById(req.userAuth.id)
    admin.academicTerms.push(academicTermCreated._id)
    await admin.save()
    res.status(StatusCodes.CREATED).json({
        message:'academic term created successfully',
        data:academicTermCreated
    })
}

const getAcademicTerms = async(req,res)=>{
    const academicTerms = await AcademicTerm.find()
    res.status(StatusCodes.OK).json({
        message:'Academic Terms fetched successfully',
        data:academicTerms
    })
}

const getAcademicTerm =async(req,res)=>{
    const academicTerm = await AcademicTerm.find({_id:req.params.id})
    res.status(StatusCodes.OK).json({
        message:'success',
        data:academicTerm
    })

} 

const updateAcademicTerm = async(req,res)=>{
    const {name,description,duration} = req.body
    const academicTermFound = await AcademicTerm.findOne({name})
    if(academicTermFound){
        throw new Error('academic term already exists')
    }

    const academicTerm = await AcademicTerm.findByIdAndUpdate(req.params.id,
        {name,description,duration,createdBy:req.userAuth.id},
         {new:true, runvalidators:true})
         if(!academicTerm){
            throw new Error(`No id found for ${req.params.id}`)
         }

         res.status(StatusCodes.OK).json({
            message:"academic term successfully updated",
            data:academicTerm
         })
}

const deleteAcademicTerm = async(req,res)=>{
    await AcademicTerm.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({
        message:'Academic terms successfully deleted',
    })

}

module.exports = {createAcademiTerm,getAcademicTerm,getAcademicTerms,updateAcademicTerm,deleteAcademicTerm}