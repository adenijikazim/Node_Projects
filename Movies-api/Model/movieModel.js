const mongoose = require('mongoose')
const validator= require('validator')


const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A movie must have a name'],
        unique:true,
        maxlength:[25, 'A movie must not have more than 25 character'],
        minlength:[4, 'The minimum length required is 3'],
        // validate:[validator.isAlpha, "A name can only contain alphabet "]
    },

    language:{
        type:String,
        required:[true, ' Please specify language']
    },

    releaseYear:{
        type:Date,
        required:[true, 'Date field is required']
    },

    duration:{
        type:Number,
        required:[true, 'A required field']
    },

    actors:{
        type:[String],
        required:[true, 'A movie must have actors']

    },

    price:{
        type:Number,
        required:[true, "Please input price"],
        // min:[2, 'Minimum of 2 digits is required'], /*built in validator*/
        // max:[4, 'Maximum of 4 digits is required'], /*built in validator*/

        // OR CUSTOM VALIDATOR
        // validate:{validator:function(v){
        //     return v>=2&&v<=4
        // },
        // Message:"Ratings should be 2 or below 4"

        // }
    
    },
    genres:{
        type:[String],
        required:[true, 'Genres is arequired field'],
        // enum:{

        //     values:['comedy','science', 'fiction','action','Thriller','Sci-fi'],
        //     messages:'This genres does not exist'
        // }

    },
    releaseYear:{
        type:Number,
        required:[true, 'Please state release year']
    },
    ratings:{
        type:Number,
        default:4.5

    },
}, {
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

movieSchema.virtual('durationInHours').get(function(){
    return this.duration/60
})

const Movie = mongoose.model('Movie', movieSchema)


module.exports = Movie