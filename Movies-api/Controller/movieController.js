const {StatusCodes} = require('http-status-codes')
const customError = require('../utils/customError')
const Movie = require('../Model/movieModel')
const Review = require('../Model/reviewModel')

const createMovie = async(req,res)=>{
    // req.body.user = req.user.userId
    const {name,description,ratings,duration} = req.body
    if(!name || !description || !ratings || !duration){
        res.json('[please enter all details')
    }
    const movie = await Movie.create(req.body)
    res.status(StatusCodes.CREATED).json({movie})

}

const getAllMovies = async(req,res)=>{
    // const movie = await Movie.find()
    const movie = await Movie.find()
    res.status(StatusCodes.OK).json({length:movie.length,movie})

}

const getMovieStats = async(req,res)=>{
    const movies = await Movie.aggregate([
        {
            $match:{ratings:{$gte:3}}
        },
        {$group:{
            _id:null, // group by null
            _id:'$releaseYear', // group by release year
            avgRating:{$avg:"$ratings"},
            avgPrice:{$avg:"$price"},
            minPrice:{$min:"$price"},
            maxPrice:{$max:"$price"},
            priceTotal:{$sum:'$price'},
            movieCount:{$sum:1}
        }},
        {$sort:{minPrice:1}}
    ])
    res.status(statusCodes.OK).json({movies})
}

const getMovie = async(req,res)=>{
    const movie = await Movie.findOne({_id:req.params.id})
    if(!movie){
        const error = new customError(`No movie with the id ${req.params.id}`, 404)
        return next(error)
    }
    res.status(StatusCodes.OK).json({movie})

}
const deleteMovie = async(req,res)=>{
    const movie = await Movie.findByIdAndDelete({_id:req.params.id})
    if(!movie){
        res.json(`No movie with the id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({message:"movie removed"})

}

const updateMovie = async(req,res)=>{
    const {name,description,ratings,duration} = req.body
    const movie = await Movie.findByIdAndUpdate({_id:req.params.id}, {runValidators:true,new:true},req.body)
    if(!movie){
        res.json(`No movie with the id ${req.params.id}`)
    }
   
    res.status(StatusCodes.OK).json({movie})}
// const updateMovie = async(req,res)=>{
//     const {name,description,ratings,duration} = req.body
//     const movie = await Movie.findOne({_id:req.params.id})
//     if(!movie){
//         res.json(`No movie with the id ${req.params.id}`)
//     }
//     movie.description = description
//     movie.name = name
//     movie.ratings = ratings
//     movie.duration = duration
//     validateBeforeSave(false)
//     await movie.save()
//     res.status(StatusCodes.OK).json({movie})

// }



module.exports = {createMovie,getAllMovies,getMovie,deleteMovie,updateMovie,getMovieStats}