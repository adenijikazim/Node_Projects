const mongoose = require('mongoose')
const Movie = require('./movieModel')
const reviewSchema = new mongoose.Schema({
  
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true, 'please provide rating']

    },

    comment:{
        type:String,
        required:[true, 'please enter review comment']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'review must belong to a User']

    },
    movie:{
        type:mongoose.Types.ObjectId,
        ref:'Movie',
        required:[true, 'review must belong to a movie']
    }

},{timestamps:true})

reviewSchema.index({movie:1, user:1},{unique:true})


reviewSchema.pre('/^find/', function(next){
    this.populate({
        ref:'movie',
        path:'name'
    }).populate('user')
    next()
})




const Review = mongoose.model('Review', reviewSchema)
module.exports = Review