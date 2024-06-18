require('dotenv').config()
const express = require('express')
const app = express()
require("async-error-handler")
// const mongoose  = require('mongoose')
const connectDB = require('./server')
const cookieParser = require('cookie-parser');



const morgan = require('morgan')
const CustomError = require('./utils/customError')
const authRouter = require('./Routes/authRoute')
const globalErrorHandler = require('./Controller/globalErrorHandler')
const userRouter = require('./Routes/userRoute')
const movieRouter = require('./Routes/movieRoutes')
const reviewRouter = require('./Routes/reviewRoutes')

app.use(globalErrorHandler)
app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/reviews', reviewRouter)

app.all('*',(req,res,next)=>{
    const err = new CustomError(`Cant find ${req.originalUrl} on the server`, 404)
    next(err)
})

connectDB()

const PORT = 2500
app.listen(2500, console.log(`app is listening on port ${PORT}`))