const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')

const adminschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        default:'Admin'
    },

    academicTerms:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'AcademicTerms'
        }
    ],
    programs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Program'
        }
    ],
    academicYears:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'AcademicYears'
        }
    ],
    classLevels:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'ClassLevel'
        }
    ],
    yearGroups:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'YearGroup'
        }
    ],
    teachers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Teacher'
        }],
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Students'
        }
    ]

},{timeStamps:true})

adminschema.pre('save',async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

adminschema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

const Admin = mongoose.model('AdminModel', adminschema)
module.exports = Admin