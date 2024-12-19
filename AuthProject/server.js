//  npm i joi helmet express mongoose nodemon bcryptjs cookie-parser nodemailer cors jsonwebtoken

const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    // mongoose.connect('mongodb+srv://Qasim:12345@tours.0uu0pza.mongodb.net/fullAuth?retryWrites=true&w=majority&appName=tours')
    .then(()=>{console.log(`app connected to DataB`)})
    .catch((error)=>{console.log(error)})
}

module.exports = connectDB