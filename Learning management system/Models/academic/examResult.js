const mongoose = require('mongoose')

const examResultSchema = new mongoose.Schema({
    // student:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Student",
    //     required:true
    // },
    studentID:{
        type:String,
        required:true
    },
    exam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Exam',
        required:true
    },
    grade:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    passMark:{
        type:Number,
        required:true,
        default:50
    },
    answeredQuestions:[{
        type:Object
    }
    ],
    status:{
        type:String,
        required:true,
        enum:['failed', 'passed'],
        default:'failed'
    },
    remarks:{
        type:String,
        required:true,
        enum:['Excellent','Good','Poor','Fail','Very good'],
        default:'Poor'
    },
    
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    },
    classLevel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ClassLevel'
    },
    academicTerm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AcademicTerms',
        required:'true'
    },
    academicYear:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AcademicYears',
        required:'true'
    },
    isPublished:{
        type:Boolean,
        default:true
    }

},{timestamps:true})


const ExamResult = mongoose.model('ExamResult', examResultSchema)
module.exports = ExamResult