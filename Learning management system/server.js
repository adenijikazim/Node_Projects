const mongoose = require('mongoose')

const DBConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connected successfully')
        
    } catch (err) {
        console.log('db failed to connect')
        
    }

}

module.exports = DBConnect



