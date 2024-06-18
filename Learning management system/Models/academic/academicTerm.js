const mongoose = require('mongoose')

const academicTerms = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    duration:{
        type:String,
        required:true,
        default:"3 months"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    }
},{timestamps:true})

const AcademicTerms =new mongoose.model('AcademicTerms', academicTerms )
module.exports = AcademicTerms