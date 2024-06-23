const {StatusCodes} = require('http-status-codes')
const Review = require('../models/reviewModel')
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');


///////////////////////// CREATE A REVIEW //////////////////
const createReview = async(req,res,next)=>{
  req.body.user = req.user.id
  const { product: productId } = req.body;
    
  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    const error = new CustomError(`No product with id : ${productId}`)
    return next(error)
  }

//   taken care of in the model
  /*const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    );
  }*/
    
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({review})


}


///////////////////////// GET ALL REVIEWS //////////////////
const getAllReviews= async(req,res)=>{
    const reviews = await Review.find({}).populate({
        path:'product',
        select:'name company'
    })
    .populate({
      path:'user',
      select:'name'
    })
    // .populate('user')
    res.status(StatusCodes.OK).json({"number of reviews":reviews.length, reviews, })

}



///////////////////////// GET A REVIEW //////////////////
const getReview=async(req,res,next)=>{
    const review = await Review.findOne({_id:req.params.id})
    if(!review){
        const error = new CustomError(`No review for this ID`)
        return next(error)
    }
    res.status(StatusCodes.OK).json({review})

}


///////////////////////// UPDATE A REVIEW //////////////////
const updateReview=async(req,res,next)=>{
    const review = await Review.findOne({_id:req.params.id})
    const {comment,rating,title}=req.body
    if(!review){
        const error = new CustomError(`No review found for the id ${req.params.id}`)
        return next(error)
    }

    review.title=title
    review.rating=rating
    review.comment=comment
    await review.save({validateBeforeSave:false})
    res.status(StatusCodes.OK).json({review})

}


///////////////////////// DELETE A REVIEW //////////////////
const deleteReview=async(req,res,next)=>{
    const review = await Review.findByIdAndDelete({_id:req.params.id})
    if(!review){
        const error = new CustomError(`No review found for the id ${req.params.id}`)
        return next(error)
    }



    res.status(StatusCodes.OK).json({message:'review has been deleted'})

}

const getSingleProductReviews = async(req,res)=>{
  const {id:productId} = req.params
  const review = await Review.findOne({product:productId})
  res.status(StatusCodes.OK).json({review})

}

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    deleteReview,
    updateReview,
    getSingleProductReviews
}