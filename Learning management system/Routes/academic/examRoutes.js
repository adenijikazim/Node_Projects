const express = require('express')
const { createExam, getAllExams, getExam, updateExam } = require('../../Controllers/academics/examCtrl')
const { authenticateTeacher, authorizeTeacher } = require('../../middlewares/teacherAuth')
const examRouter = express.Router()

examRouter.route('/')
.post(authenticateTeacher,authorizeTeacher,createExam)
.get(authenticateTeacher,authorizeTeacher,getAllExams)

examRouter.route('/:id')
.get(authenticateTeacher,authorizeTeacher,getExam)
.patch(authenticateTeacher,authorizeTeacher,updateExam)

module.exports = examRouter