const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'title is required']
    },
    description:{
        type:String,
        trim:true,
        required:[true,'description is required']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})



const postsModel = mongoose.model('Post', postsSchema)
module.exports = postsModel