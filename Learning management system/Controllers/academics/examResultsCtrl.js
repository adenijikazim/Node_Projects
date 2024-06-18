const {StatusCodes} = require('http-status-codes')
const ExamResult = require('../../Models/academic/examResult')
const Student = require('../../Models/academic/student')

const checkExamResults = async(req,res)=>{
    const studentFound = await Student.findById(req.studentAuth._id)
        if(!studentFound){
            throw new Error('no student found')
        }
    // find the exam results
    const examResult = await ExamResult.findOne({
        _id:req.params.id,
       studentID: studentFound.studentId
    })
    .populate({
        ref:'exam', 
        path:'questions'
    })
    .populate('classLevel')
    .populate('academicTerm')
    .populate('academicYear')

    if(examResult.isPublished === false){
        throw new Error('Result not available, please check later')
    }
    res.status(StatusCodes.OK).json({
        message:"exam Result",
        data:examResult,
        student:studentFound
    })

}

const getAllExamResults = async(req,res)=>{
    const examResults = await ExamResult.find().select('exam').populate('exam')
    res.status(StatusCodes.OK).json({
        message:"Result fetched successfully",
        data:examResults
    })

}

// @desc Admin publish result
const adminToggleExamResult = async(req,res)=>{
    // find exam result
    const examResult = await ExamResult.findById(req.params.id)
    if(!examResult){
        throw new Error('Exam result not found')
    }

    const publishResult = await ExamResult.findByIdAndUpdate(req.params.id,
        {ispublished:req.body.published},
        {new:true, runValidators:true}
        )
    res.status(StatusCodes,OK).json({ 
        message:'exam result updated',
        data:publishResult
    })

}


module.exports = {checkExamResults,getAllExamResults,adminToggleExamResult}