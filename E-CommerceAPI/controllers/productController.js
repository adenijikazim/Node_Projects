// const { NotFoundError, BadRequestError } = require('../errors')
const path = require('path')
const Product = require('../models/productModel') 
const {StatusCodes}= require('http-status-codes')
const CustomError = require('../utils/customError')
const Review = require('../models/reviewModel')

const createProduct =async (req,res,next)=>{
    const {name} = req.body
    req.body.user = req.user.id
    const productExist = await Product.findOne({name})
    if(productExist){
        const error = new CustomError('Product already exist')
        return next(error)
    }
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

// desc - get all products
// routes api/v1/products
// private authuser
const getAllProducts = async(req,res)=>{
    // convert queryStrings to number 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.skip) || 2;
    const skip = (page-1) * limit;
    const total = await Product.countDocuments()

const products = await Product.find()
.skip(skip).limit(limit)
.populate('reviews')

res.status(StatusCodes.OK).json({
    status:'success',
    total,
    results:products.length,
    message:"Products fetched successfully",
    products})
}

// @desc get a single product
// @route api/v1/product/:id
// @privacy authUser
const getSingleProduct = async(req,res)=>{
const product = await Product.find({_id:req.params.id})
if(!product){
    const error = new CustomError('Invalid product id')
    return next(error)
}
res.status(StatusCodes.OK).json({product})

}

const updateProduct = async(req,res)=>{
    const product = await Product.findByIdAndUpdate({_id:req.params.id},
        req.body,
        {runValidators:true,new:true})
        if(!product){
            const error = new CustomError('Invalid product id')
            return next(error)
        }
        res.status(StatusCodes.OK).json({product})
}


const deleteProduct = async(req,res,next)=>{
    const product = await Product.findByIdAndDelete({_id:req.params.id})
    if(!product){
        const error = new CustomError(`No product with the id: ${req.params.id}`)
        return next(error)

    }
    res.status(StatusCodes.OK).json({msg:'product removed'})

}




const uploadImage=async(req,res)=>{
    if(!req.files){
        const error = new CustomError(`No product with the id: ${req.params.id}`)
        return next(error)

    }

    let productImage = req.files.image
    if(!productImage.mimetype.startsWith('image')){
        const error = new CustomError('please upload an image')
        return next(error)
    }

    let maxSize = 1024*1024
    if(productImage.size > maxSize){
        throw new BadRequestError('please upload a file less than 1mb')
    }

    let imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)

    res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})
    console.log(req.files)


  /*if(!req.files){
        throw new BadRequestError('No file uploaded')
    }
    let productImage = req.files.image
    if(!productImage.mimetype.startsWith('image')){
        throw new BadRequestError('please upload image')
    }

    const maxSize = 1024*1024
    if(productImage.size>maxSize){
        throw new BadRequestError('please upload image less than 1mb')
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})*/

}

module.exports = {
    createProduct,
    getSingleProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    uploadImage
}