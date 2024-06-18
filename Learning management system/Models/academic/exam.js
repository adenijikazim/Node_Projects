const mongoose = require('mongoose')
const examSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    },
    program:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Program'
    },
    passMark:{
        type:Number,
        required:true,
        default:50

    },
   
    totalMark:{
        type:Number,
        required:true,
        default:100
    },
   
    duration:{
        type:String,
        required:true,
        default:"30 minutes"
    },
    examDate:{
        type:Date,
        required:true,
        default:new Date()
    },
    examTime:{
        type:String,
        required:true
    },
    examType:{
        type:String,
        required:true,
        default:"Quiz"
    },
    examStatus:{
        type:String,
        required:true,
        enum:['pending', 'live'],
        default:'pending'
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }],
    classLevel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ClassLevel',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'

    },
    academicTerm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AcademicTerms'
    },
    academicYear:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AcademicYears'
    }
},{timestamps:true})

const Exam = mongoose.model('Exam', examSchema)
module.exports = Exam