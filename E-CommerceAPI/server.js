const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(console.log('DB sucessfully connected'))
}

module.exports = connectDB