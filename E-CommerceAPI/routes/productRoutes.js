const express = require('express')
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController')
const { authenticateUser, authorizeUser } = require('../middleware/authenticate')
const { getSingleProductReviews } = require('../controllers/reviewController')
const productRouter = express.Router()


productRouter.route('/')
.post(authenticateUser,authorizeUser('admin'),createProduct)
.get(getAllProducts)

productRouter.route('/uploadImage')
.post(authenticateUser,authorizeUser('admin'),uploadImage)

productRouter.route('/:id').get(getSingleProduct)  
.patch(authenticateUser,authorizeUser('admin'),updateProduct)
.delete(authenticateUser,authorizeUser('admin'),deleteProduct)

productRouter.get('/:id/reviews', getSingleProductReviews)

module.exports = productRouter