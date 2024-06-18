const express = require('express')
const { authenticateUser, authorizeUser } = require('../middleware/authenticate')
const { createReview, getAllReviews, getReview, updateReview, deleteReview } = require('../controllers/reviewController')
const reviewRouter = express.Router()

reviewRouter.route('/')
.post(authenticateUser,createReview)
.get(getAllReviews)

reviewRouter.route('/:id')
.get(getReview)
.patch(authenticateUser,updateReview)
.delete(authenticateUser,authorizeUser('admin'),deleteReview)

module.exports = reviewRouter
