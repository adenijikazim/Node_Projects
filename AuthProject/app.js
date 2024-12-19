require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-Parser')
const connectDB = require('./server')
const authRouter = require('./routes/authRouter')
const globalErrorHandler = require('./controllers/errorController')

app.use(cors({origin:['http://localhost:3000', 'http://localhost:3001']}))
app.use(helmet())
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRouter)

app.get('/',(req,res)=>{
    console.log(`app is running on port`)
    res.send("app is running")
})


app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

connectDB()
const PORT =process.env.PORT || 3000


app.listen(process.env.PORT, console.log(`app is listening on port port ${PORT}`))