require('dotenv').config()
const express = require('express')
const app = express()
require("async-error-handler")
const connectDB = require('./server')
const cookieParser = require('cookie-parser');



const morgan = require('morgan')
const authRouter = require('./routes/authRoutes')
const globalErrorHandler = require('./controllers/globalErrorHandler')
const CustomError = require('./utils/customError')
const userRouter = require('./routes/userRoutes')

app.use(globalErrorHandler)
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.all('*',(req,res,next)=>{
    const err = new CustomError(`Cant find ${req.originalUrl} on the server`, 404)
    next(err)
})

connectDB()

// const PORT = 2005
app.listen(2006, console.log(`app is listening on port 2006`))