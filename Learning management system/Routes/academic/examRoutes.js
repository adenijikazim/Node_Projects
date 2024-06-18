const express = require('express')
const { createExam, getAllExams, getExam, updateExam } = require('../../Controllers/academics/examCtrl')
// const { authenticateTeacher, authorizeTeacher } = require('../../middlewares/teacherAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const examRouter = express.Router()

examRouter.route('/')
.post(authenticateUser,authorizeUser('Teacher'),createExam)
.get(authenticateUser,authorizeUser('Teacher'),getAllExams)

examRouter.route('/:id')
.get(authenticateUser,authorizeUser('Teacher'),getExam)
.patch(authenticateUser,authorizeUser('Teacher'),updateExam)

module.exports = examRouter