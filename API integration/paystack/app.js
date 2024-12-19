require('dotenv').config()
const express = require('express')
const transactionRouter = require('./routes/transactionRoutes')
const connectDB = require('./server')
const app = express()

app.use(express.json())

app.use('/api/v1/transaction', transactionRouter)

connectDB()
app.listen(3400, console.log(`app is listening on port 3400`))