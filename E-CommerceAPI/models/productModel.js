const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'please provide provide name'],
        maxlength:[100, 'product name cannot be more than 100']
    },
    price:{
        type:Number,
        required:[true, 'please provide product price'],
        default:0
    },
    description:{
        type:String,
        required:[true, 'please provide product description'],
        maxlength:[1000, 'Description cannot be more than 1000 characters']

    },
    image:{
        type:String,
        default:'/uploads/computer-2.jpg'
    },
    category:{
        type:String,
        required:[true, 'Please provide category'],  
        enum:['office','kitchen','bedroom']
    },
    company:{
        type:String,
        required:[true, 'Please provide company'],  
        eunm:{
            values:['ikea','marcos','liddy'],
            message:'{VALUE} is not supported'
        }
    },
    colors:{
    type:[String],
    required:true},

    featured:{
        type:Boolean,
        default:false
    },
    freeShipping:{
        type:Boolean,
        default:false
    },
    inventory:{
        type:Number,
        required:true,
        default:15

    },
    averageRating:{
        type:Number,
        default:0
    },

    numOfReviews:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },

},{timeStamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}})

productSchema.virtual('reviews', {
    ref:'Review',
    localField:'_id',
    foreignField:'product',
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product