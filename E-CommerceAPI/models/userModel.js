const mongoose = require('mongoose')
const validator=require('validator')
const bcrypt = require('bcryptjs')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please enter name'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true, 'please enter email'],
        minlength:6,
        validate:{
            validator:validator.isEmail,
            message:'please enter a valid email'
        }
    },
    password:{
        type:String,
        required:[true, 'please enter password'],
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        // default:'user'

    }
},{timestamps:true})

userSchema.pre('save', async function(){
     if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)


