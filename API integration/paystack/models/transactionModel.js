const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    email:{

    }, 

     
    amount:{

    },

    reference:{

    }, 
    
    paymentLink:{

    },
    paymentStatus:{
        type:String,
        enum:['paid', 'notPaid'],
        default:'notPaid'
    }
   
})

const transaction = new mongoose.model('Transaction', transactionSchema)
module.exports = transaction

