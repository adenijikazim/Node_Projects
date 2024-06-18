const mongoose = require('mongoose')
const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    },
    academicTerm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"academicTerm"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    duration:{
        type:String,
        required:true,
        default:'3 months'
    }

},{timestamps:true})


const Subject = mongoose.model('Subject', subjectSchema)
module.exports  = Subject