const mongoose = require('mongoose')
const Product = require('./productModel')
const ReviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true, 'please provide rating']

    },
    title:{
        type:String,
        trim:true,
        required:[true, 'please provide review title'],
        maxlength:100},
    comment:{
        type:String,
        required:[true, 'please provide review text'],


    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    }
},{timeStamps:true})

ReviewSchema.index({user:1, product:1}, {unique:true})

ReviewSchema.statics.calcAverageRatings = async function(productId){
    const result = this.aggregate([
        {$match:{product:productId}},
        {$group:{_id:null, 
        averageRating:{$avg:"$rating",
        numOfReviews:{$sum:1}}}}
    ])

    await Product.findOneAndUpdate({_id:productId},
    {averageRating:Math.ceil(result[0]?.averageRating || 0),
    numOfReviews:result[0]?.numOfReviews || 0}
    )

}

ReviewSchema.post('save', async function(){
    this.constructor.calcAverageRatings(this.product)
    
})
ReviewSchema.post('remove', async function(){
    this.constructor.calcAverageRatings(this.product)


})

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review