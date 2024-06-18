const express = require('express')
const { createQuestion, getQuestions, getQuestion, updateQuestion, deleteQuestion } = require('../../Controllers/academics/questionCtrl')
// const { authenticateTeacher, authorizeTeacher } = require('../../middlewares/teacherAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const questionRouter = express.Router()


questionRouter.get('/',authenticateUser,authorizeUser('Teacher'), getQuestions)
questionRouter.route('/:id') 
.get(authenticateUser,authorizeUser('Teacher'), getQuestion)
.patch(authenticateUser,authorizeUser('Teacher'), updateQuestion)
.delete(authenticateUser,authorizeUser('Teacher'), deleteQuestion)
, 
questionRouter.post('/:examID',authenticateUser,authorizeUser('Teacher'), createQuestion)

module.exports = questionRouter