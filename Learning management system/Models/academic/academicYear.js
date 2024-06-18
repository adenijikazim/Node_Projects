const mongoose = require('mongoose')
const academicYearSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fromYear:{
        type:Date,
        required:true
    },
    toYear:{
        type:Date,
        required:true
    },
    isCurrent:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true

    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
    }],
    teachers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    }]
},{timestamps:true})

const AcademicYears = mongoose.model('AcademicYears', academicYearSchema)
module.exports = AcademicYears