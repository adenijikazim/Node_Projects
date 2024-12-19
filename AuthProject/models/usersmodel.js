const { string } = require('joi')
const mongoose = require('mongoose')
const validator= require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    userName:{
        type:string,
        required:[true, 'please provide a user name'],
        trim:true,
        minLength:4,
        maxLength:30,
        index:true
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:[true, 'email already exists'],
        validate:[validator.isEmail, 'please provide a valid email'],
        minLength:[5, 'email must have at least 5 characters'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true, 'please provide a password'],
        lowercase:true,
        trim:true,
        select:false,

    },
    confirmPassword:{
        type:String,
        required:[true, 'please provide a password'],
        trim:true,
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:'passwords are not the same'
        }
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:string,
        default:null
    },
    otpExpires:{
        type:Date,
        default:null

    },
    resetPasswordOtp:{
        type:string,
        default:null

    },
    resetPasswordOtpExpires:{
        type:Date,
        default:null

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    // verificationCodeValidation:{
    //     type:Number,
    //     default:false
    // },
    // forgotPasswordCode:{
    //     type:String,
    //     default:false

    // }
    // forgotPasswordCodeValidation:{
    //     type:Number,
    //     default:false
    // }
},{timestamps:true})

userSchema.pre('save', async function(){
    if(!this.isModified(this.password)) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    this.confirmPassword = undefined
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

const userModel = mongoose.model('User', userSchema)
module.exports = userModel