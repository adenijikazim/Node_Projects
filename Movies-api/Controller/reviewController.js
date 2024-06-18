const { StatusCodes } = require("http-status-codes")
const customError = require("../utils/customError")
const Review = require("../Model/reviewModel")
const Movie = require("../Model/movieModel")

const createReview = async(req,res)=>{
    console.log(req.user)
    const {movie :movieId} = req.body
    req.body.user = req.user.userId
    const isValidMovie = await Movie.findOne({_id:movieId})
    if(!isValidMovie){
        const error = new customError(`No movie with id${movieId}`, 404)
        next(error)

    }
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({message:review}) 

}

const getAllReviews = async(req,res)=>{
    console.log(req.user)

const reviews = await Review.find().populate({
    path:"movie",
    select:"name"
})
res.status(StatusCodes.OK).json({
    results:reviews.length,
    data:{
        reviews
    }
})

}

const getReview = async(req,res)=>{
const review = await Review.findOne({_id:req.params.id}).populate({
    ref:"movie"
})
if(review){
const error = new customError(`Theres is review with this id: {req.params.id}`, 401)
return next(error)
}

res.status(StatusCodes.OK).json({review})

}

const updateReview = async (req,res)=>{
const {comment,rating,title}=req.body
const review = await Review.findOne({_id:req.params.id})
if(!review){
const error = new customError(`There is no review with this id{req.params.id}`)
return next(error)}
review.title = title,
review.rating = rating,
review.comment = comment

await review.save()
res.status(StatusCodes.OK).json({review})

}

const deleteReview = async(req,res)=>{
    const review = await Review.findByIdAndDelete({_id:req.params.id})
    if(!review){
        const error =new customError(`No review found for this id ${req.params.id}`, 400)
    } 
    res.status(StatusCode.OK).json({'message':'review has been succesfully deleted'})
}

const getSingleMovieReview = async(req,res)=>{
    const {id:movieId} = req.params
    const review = await Review.find({movie:movieId})
    res.status(StatusCodes.OK).json({review})
}

module.exports = {
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview,
    getSingleMovieReview
}