require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const DBConnect = require('./server')
const app = express()
const globalErrorHandler = require('./middlewares/errorHandler')

const adminRouter = require('./Routes/staff/adminRoutes')
const academicTermRouter = require('./Routes/academic/academicTermRoutes')
const academicYearRouter = require('./Routes/academic/academicyearRoutes')
const classLevelRouter = require('./Routes/academic/classLevelsRoutes')
const programRouter = require('./Routes/academic/programRoutes')
const subjectRouter = require('./Routes/academic/subjectsRoutes')
const yearGroupRouter = require('./Routes/academic/yearGroupRoutes')
const teacherRouter = require('./Routes/staff/teachersRoutes')
const examRouter = require('./Routes/academic/examRoutes')
const studentRouter = require('./Routes/students/studentsRoutes')
const questionRouter = require('./Routes/academic/questionRoutes')
const examResultsRouter = require('./Routes/academic/examResultsRoutes')
const cookieParser = require('cookie-parser');

app.use(globalErrorHandler)
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/lms/admins', adminRouter)
app.use('/api/v1/lms/academic-Years', academicYearRouter)
app.use('/api/v1/lms/academic-Terms', academicTermRouter)
app.use('/api/v1/lms/class-Levels', classLevelRouter)
app.use('/api/v1/lms/programs', programRouter)
app.use('/api/v1/lms/subjects', subjectRouter)
app.use('/api/v1/lms/year-Groups', yearGroupRouter)
app.use('/api/v1/lms/teachers', teacherRouter)
app.use('/api/v1/lms/exams', examRouter)
app.use('/api/v1/lms/students', studentRouter)
app.use('/api/v1/lms/questions', questionRouter)
app.use('/api/v1/lms/exam-Results', examResultsRouter)

app.all('*',(req,res,next)=>{
    const err = new Error(`Cant find ${req.originalUrl} on the server`)
    next(err)
})


// app.use(globalErrorHandler)
DBConnect()

const PORT = process.env.PORT || 2020
app.listen(PORT, console.log(`app is listening on port ${PORT}`))