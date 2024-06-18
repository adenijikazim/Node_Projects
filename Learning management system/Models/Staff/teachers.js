const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')


const teachersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        validate:[validator.isEmail, 'please enter a valid email address'],
        required:[true, 'please enter teachers email']
    },

    password:{
        type:String,
        required:true
    },
    dateEmployed:{
       type:Date,
       default:Date.now
    },
    teachersId:{
        type:String,
        required:true,
        default:function(){
            return(
                "TEA"+Math.floor(100+Math.random()*900)+
                Date.now().toString().slice(2,4)+
                this.name
                .split('')
                .map(name=>name[0])
                .join('')
                .toUpperCase()
            );
        }

    },
    isWithdrawn:{
        type:Boolean,
        default:false
    },
    isSuspended:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'teacher'
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        // required:true
    },
    applicationStatus:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    program:{
        type:String
        // ref:'Program',
        // required:true
    },
    classLevel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ClassLevel',
        // required:true
    },
    academicYear:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AcademicYear',
        // required:true
    },
    examsCreated:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Exam',
        // required:true
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    },
    academicTerm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AcademicTerm',
        // required:true
    }


},{timestamps:true})

teachersSchema.pre('save', async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

teachersSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

const Teacher = mongoose.model('Teacher', teachersSchema)
module.exports = Teacher