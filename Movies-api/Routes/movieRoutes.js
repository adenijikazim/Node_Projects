const express = require('express')
const movieRouter = express.Router()
const { createMovie, getAllMovies, getMovie, updateMovie, deleteMovie, getMovieStats } = require('../Controller/movieController')
const { getSingleMovieReview } = require('../Controller/reviewController')
const { authenticateUser, authorizeUser } = require('../middlewares/authMiddlware')

movieRouter.route('/')
.post(authenticateUser, authorizeUser('admin'),createMovie)
.get(authenticateUser,getAllMovies)

movieRouter.route('/:id')
.get(getMovie)
.patch(authenticateUser,authorizeUser('admin'),updateMovie)
.delete(authenticateUser,authorizeUser('admin'),deleteMovie)

movieRouter.get('/movie-Stats', getMovieStats)
movieRouter.get('/:id/reviews', getSingleMovieReview)

module.exports = movieRouter