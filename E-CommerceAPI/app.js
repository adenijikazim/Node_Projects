require('dotenv').config()
const express = require('express')
const app = express()
require("async-error-handler")
// const mongoose  = require('mongoose')
const connectDB = require('./server')
const cookieParser = require('cookie-parser');



const morgan = require('morgan')
const CustomError = require('./utils/customError')
const reviewRouter = require('./routes/reviewRoutes')
const authRouter = require('./routes/authRoutes')
const globalErrorhandler = require('./controllers/globalErrorhandler')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

app.use(globalErrorhandler)
app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'))

app.use('/api/v1/ecommerce/auth', authRouter)
app.use('/api/v1/ecommerce/users', userRouter)
app.use('/api/v1/ecommerce/products', productRouter)
app.use('/api/v1/ecommerce/reviews', reviewRouter)

app.all('*',(req,res,next)=>{
    const err = new CustomError(`Cant find ${req.originalUrl} on the server`, 404)
    next(err)
})

connectDB()

const PORT = 3000
app.listen(PORT, console.log(`app is listening on port ${PORT}`))