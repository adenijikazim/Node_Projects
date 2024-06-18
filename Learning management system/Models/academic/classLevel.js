const mongoose = require('mongoose')
const classLevel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'Admin',
        required:true
    },
    students:[{
        type:mongoose.Types.ObjectId,
        ref:'Student',
        required:true

    }],
    subjects:[{
        type:mongoose.Types.ObjectId,
        ref:'Subject',
        required:true

    }],
    teachers:[{
        type:mongoose.Types.ObjectId,
        ref:'Teacher',
        required:true

    }]
},{timestamps:true})

const ClassLevel = mongoose.model('ClassLevel', classLevel)
module.exports = ClassLevel 