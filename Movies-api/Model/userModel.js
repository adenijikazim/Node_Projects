const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validate = require('validator')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please provide your name'],
        minlength:3,
        maxlength:10
    },
    email:{
        type:String,
        required:[true, 'kindly provide your email'],
        unique:true,
        validate:[validate.isEmail, 'please provide a valid email']
       
    },
    password:{
        type:String,
        required:[true, 'please enter your password'],
        minlength:8

    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    },

    confirmPassword:{
        type:String,
        required:[true, 'please confirm your password']
        
    // //     validate:{validator:function(val){
    // //         return val === this.password
    // //     },
    // // message:"password and password Confirm does not match"}

    },

  
    
},{timeStamp:true})

userSchema.pre('save', async function(){
    if(this.password !== this.confirmPassword){
        const err = new Error('passwords does not match')
        next(err)
    }
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)
    this.confirmPassword =undefined
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)}



const User = mongoose.model('User', userSchema)

module.exports = User
