const express = require('express')
const { createQuestion, getQuestions, getQuestion, updateQuestion, deleteQuestion } = require('../../Controllers/academics/questionCtrl')
const { authenticateTeacher, authorizeTeacher } = require('../../middlewares/teacherAuth')
const questionRouter = express.Router()


questionRouter.get('/',authenticateTeacher,authorizeTeacher, getQuestions)
questionRouter.route('/:id') 
.get(authenticateTeacher,authorizeTeacher, getQuestion)
.patch(authenticateTeacher,authorizeTeacher, updateQuestion)
.delete(authenticateTeacher,authorizeTeacher, deleteQuestion)
, 
questionRouter.post('/:examID',authenticateTeacher,authorizeTeacher, createQuestion)

module.exports = questionRouter