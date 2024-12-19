const mongoose = require('mongoose')

const DBCONNECT = async()=>{
    await mongoose.connect(process.env.DB_URL)
.then   (() => console.log('connected to DB'))
.catch  ((err) => console.log(err))}

module.exports = DBCONNECT