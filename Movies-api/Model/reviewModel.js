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

reviewSchema.statics.calcAverageRatings= async function(movieId){
    // this points to this model 
    const stats = await this.aggregate([
        {$match:{movie:movieId}},
        {
            $group:{
                _id:'movie',
                nRating:{$sum:1},
                avgRating:{$avg: '$Rating'}
            }
        }
    ])

    // console.log(stats)
    if(stats.length > 0){
        
        await Movie.findByIdAndUpdate(movieId, {
        ratingsQuantity:stats[0].nRating,
        ratingsAverage:stats[0].avgRating
    })
    }else{
            await Movie.findByIdAndUpdate(movieId, {
            ratingsQuantity:0,
            ratingsAverage:4.5
        })

    }

}

reviewSchema.post('save', async function(){
    // Review.calcAverageRating(this.tour)
    // this.constructor point to the current model, "this" point to the current doc and const to the model that creates the doc
    this.constructor.calcAverageRatings(this.movie)
    // next()
})

reviewSchema.pre(/^findOne/, async function(next){
this.r = await this.findOne()
next()
})

reviewSchema.post(/^findOne/, async function(){
    await this.contructor.calcAverageRatings(this.r.tour)
})



const Review = mongoose.model('Review', reviewSchema)
module.exports = Review