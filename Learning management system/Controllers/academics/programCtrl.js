const {StatusCodes} = require('http-status-codes')
const Program = require('../../Models/academic/program')
const Admin = require('../../Models/Staff/adminModel')


const createProgram = async(req,res)=>{
    const {name, description} = req.body
    const programFound = await Program.findOne({name})
    if(programFound){
        throw new Error('program name already exists')
    }
    const programCreated = await Program.create({name,description,createdBy:req.adminAuth._id})
    const admin = await Admin.findById(req.adminAuth._id)
    admin.programs.push(programCreated._id)
    admin.save()
    res.status(StatusCodes.OK).json({
        message:'program created successfully',
        data:programCreated
    })
}

const getPrograms = async(req,res)=>{
    const programs = await Program.find()
    res.status(StatusCodes.OK).json({
        message:'program fetched successfully',
        length:programs.length,
        data:programs
    })
}

const getProgram = async(req,res)=>{
    const program = await Program.findById(req.params.id)
    if(!program){
        throw new Error(`No progrma found for ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({
        message:'program fetched successfully',
        data:program
    })

}

const updateProgram = async(req,res)=>{
    const {name, description} = req.body
    const programFound = await Program.findOne({name})
    if(programFound){
        throw new Error('name already exists')
    }
    const program = await Program.findByIdAndUpdate(req.params.id, {name,description,createdBy:req.adminAuth._id},
        {runValidators:true,new:true})
        if(!program){
            throw new Error(`No program found for ${req.params.id}`)
        }

    res.status(StatusCodes.OK).json({
        message:'program successfully updated',
        data:program
    })
}

const deleteProgram = async(req,res)=>{
    const program = await Program.findByIdAndDelete(req.params.id)
    if(!program){
        throw new Error(`No program found for ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({
        message:'programs deleted successfully'
    })

}

module.exports= {createProgram,getPrograms,getProgram,updateProgram,deleteProgram}