const {StatusCodes} = require('http-status-codes')
const Program = require('../../Models/academic/program')
const Subject = require('../../Models/academic/subject')


const createSubject = async(req,res)=>{
    const {name, description, academicTerm} = req.body
    const programFound = await Program.findById(req.params.programId)
    if(!programFound){
        throw new Error('program does not exist')
    }

    const subjectFound = await Subject.findOne({name})
    if(subjectFound){
    throw new Error('Subject already exists')
    }

    const subjectCreated = await Subject.create({name,description,academicTerm,createdBy:req.userAuth.id})

    programFound.subjects.push(subjectCreated._id)
    await programFound.save()

    res.status(StatusCodes.CREATED).json({
        message:'subject created successfully',
        data:subjectCreated
    })

}

const getSubjects = async(req,res)=>{
    const subjects = await Subject.find()
    res.status(StatusCodes.OK).json({
        message:'Subjects fetched succesfully',
        count:subjects.length,
        data:subjects
    })

}

const getSubject = async(req,res)=>{
    const subject = await Subject.findById(req.params.id)
    if(!subject){
        throw new Error(`No subject found with the id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({
        message:"subject fetched succesfully",
        data:subject
    })

}

const updateSubject = async(req,res)=>{
    const {name, description, academicTerm} = req.body
    const subjectFound = await Subject.findOne({name})
    if(subjectFound){
        throw new Error('Subject name already exists')
    }
    const subject = await Subject.findByIdAndUpdate((req.params.id),{name,description,createdBy:req.userAuth.id},{runValidators:true, new:true})
    res.status(StatusCodes.OK).json({
        message:"subject succesfully updated",
        data:subject
    })

}

const deleteSubject = async(req,res)=>{
    await Subject.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({
        message:"subject deleted successfully"
    })

}

module.exports = {createSubject,getSubject,getSubjects,updateSubject,deleteSubject}