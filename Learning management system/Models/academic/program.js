const mongoose = require('mongoose')
const programSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        required:true,
        default:'4years'

    },
    code:{
        type:String,
        default:function(){
            return (this.name
                .split(" ")
                .map(name=>name[0])
                .join("")
                .toUpperCase()+
                Math.floor(10+Math.random()*90)+
                Math.floor(10+Math.random()*90)
                )
        }

    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    },
    teachers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        // required:true
    }],
    students:[
        { 
        type:mongoose.Types.ObjectId,
        ref:'Student',
        default:[]}
    ],
    subjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject',
        default:[]
    }]
},{timeStamps:true})

const Program = mongoose.model('Program', programSchema)
module.exports = Program