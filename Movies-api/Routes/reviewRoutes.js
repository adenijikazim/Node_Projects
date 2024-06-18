const express = require('express')
const { authenticateUser, authorizeUser } = require('../middlewares/authMiddlware')
const { createReview, getAllReviews, updateReview, deleteReview, getReview } = require('../Controller/reviewController')
const reviewRouter = express.Router()

reviewRouter.route('/')
.post(authenticateUser,createReview)
.get(authenticateUser,getAllReviews)

reviewRouter.route('/:tourId')
.get(getReview)
.patch(authenticateUser,authorizeUser('admin'), updateReview)
.delete(authenticateUser, authorizeUser('admin'), deleteReview)

module.exports = reviewRouter