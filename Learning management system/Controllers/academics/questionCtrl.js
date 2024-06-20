const {StatusCodes} = require('http-status-codes')
const Exam = require('../../Models/academic/exam')
const Question = require('../../Models/academic/questions')

// @desc Create Question 
// @route api/v1/:examID/questions 
// @access teachers only private 
const createQuestion = async(req,res)=>{
    const {question,optionA,optionB,optionC,optionD,correctAnswer} = req.body

    const examFound = await Exam.findById(req.params.examID)
    if(!examFound){
        throw new Error('No exam found')
    }

    const questionExist = await Question.findOne({question})

    if(questionExist){
        throw new Error('Question already exists')
    }

    const questionCreated = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy:req.teacherAuth._id})
       
        // add question to exam
        examFound.questions.push(questionCreated._id)
        await examFound.save()

        // send response
        res.status(StatusCodes.CREATED).json({
        message:'exam created successfully',
        data:questionCreated
    })

}

//@desc Get all questions 
// @routes api/v1/questions 

const getQuestions = async(req,res)=>{
    const questions = await Question.find()
    res.status(StatusCodes.OK).json({
        message:'Questions fetched successfully',
        data:questions
    })

}

// @ Get a single question 
const getQuestion = async(req,res)=>{
    const question = await Question.findById(req.params.id)
    if(!question){
        throw new Error('No question found')
    }
    res.status(StatusCodes.OK).json({
        message:'Question fetched successfully',
        data:question
    })
}

const updateQuestion = async (req,res)=>{
    const question = await Question.findByIdAndUpdate(req.params.id,
         req.body,{createdBy:req.userAuth.id},
         {runValidators:true, new:true})
    if(!question){
        throw new Error('no question found')
    }

    res.status(StatusCodes.OK).json({
        message:'question updated successfully',
        data:question
    })

}

const deleteQuestion = async(req,res)=>{
    const question = await Question.findByIdAndDelete(req.params.id)
    if(!question){
        throw new Error (' No question found for this id')
    }

    res.status(StatusCodes.OK).json({
        message:"question deleted"
    })
    
}

module.exports = {createQuestion, getQuestion,getQuestions,updateQuestion,deleteQuestion}