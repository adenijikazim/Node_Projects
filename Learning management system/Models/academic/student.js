const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
   
    studentId:{
        type:String,
        required:true,
        default:function(){
            return(
                "STU"+Math.floor(100+Math.random()*900)+
                Date.now().toString().slice(2,4)+
                this.name
                .split('')
                .map(name=>name[0])
                .join('')
                .toUpperCase()
            );
        }
    },
    role:{
       type:String,
       default:'Student'
    },


    classLevels:[{
        type:String,
    }],

    currentClassLevel:{
        type:String,
        default:function(){
            return this.classLevels[this.classLevels.length-1]
        }

    },
    academicYear:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AcademicYears",
        // required:true

    },
    dateAdmitted:{
        type:Date,
        default:Date.now()
    },
    examResults:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExamResult'
    }],
    program:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Program',
        // required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true

    },
    isPromotedTo200Level:{
        type:Boolean,
        default:false
    },
    isPromotedTo300Level:{
        type:Boolean,
        default:false
    },
    isPromotedTo400Level:{
        type:Boolean,
        default:false
    },
    isGraduated:{
        type:Boolean,
        default:false
    },
    isWithdrawn:{
        type:Boolean,
        default:false
    },
    isSuspended:{
        type:Boolean,
        default:false
    },
    prefectName:{
        type:String
    },
   /* behaviorReport:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"BehaviorReport"
    },
    financialReport:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FinancialReport"
    },*/
    yearGraduated:{
        type:Date
    }

},{timestamps:true})

studentSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

studentSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

const Student = mongoose.model('Student', studentSchema)
module.exports = Student