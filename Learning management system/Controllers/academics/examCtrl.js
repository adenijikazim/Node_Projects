const {StatusCodes} = require('http-status-codes')
const Exam = require('../../Models/academic/exam')
const Teacher = require('../../Models/Staff/teachers')

const createExam = async(req,res)=>{
    const {name,
        description,
        program,
        subject,
        academicTerm,
        duration,
        classLevel,
        // examDate,
        examTime,
        examType,
        createdBy,
        academicYear} = req.body
        const teacherFound = await Teacher.findById(req.userAuth.id).select('-password')
        if(!teacherFound){
            throw new Error('No teacher found')
        }
        const examCreated = await Exam.create(req.body)
        teacherFound.examsCreated.push(examCreated._id)
        await teacherFound.save()
        res.status(StatusCodes.CREATED).json({
            message:'exam successfully created',
            data:examCreated
        })
}

const getAllExams = async(req,res)=>{
    const exams = await Exam.find().populate('questions')
    res.status(StatusCodes.CREATED).json({
        message:'exams fetched successfully',
        data:exams
    })

}

const getExam = async(req,res)=>{
    const exam = await Exam.findById(req.params.id).populate('questions')
    if(!exam){
        throw new Error('No exam found')
    }
    res.status(StatusCodes.OK).json({
        message:"exam fetched successfully",
        data:exam
    })
}

const updateExam = async(req,res)=>{
    req.body.createdBy = req.teacherAuth._id
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body,{createdBy:req.userAuth.id}, {runValidators:true, new:true})
    if(!exam){
        throw new Error('No exam found')
    }
    res.status(StatusCodes.OK).json({
        message:"exam updated sucessfully",
        data:exam
    })
}

module.exports = {
    createExam,getAllExams,getExam,updateExam
}
