const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    refreshToken:{
        type:String,
        required:true
    },
    userAgent:{
        type:String,
        trequired:true
    },
    ip:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        default:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

const Token = mongoose.model('Token', tokenSchema)
module.exports = Token