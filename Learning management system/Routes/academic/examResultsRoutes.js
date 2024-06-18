const express = require('express')
const { getAllExamResults, adminToggleExamResult, checkExamResults } = require('../../Controllers/academics/examResultsCtrl')
// const { authenticateStudent, authorizeStudent } = require('../../middlewares/studentAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const examResultsRouter = express.Router()

examResultsRouter.get('/',authenticateUser,authorizeUser('Student'),getAllExamResults )
examResultsRouter.get('/:id/checking',authenticateUser,authorizeUser('Student'), checkExamResults)
examResultsRouter.patch('/:id/admin-toggle-publish',authenticateUser,authorizeUser('Student'),adminToggleExamResult)
// examResultsRouter.patch('/:id/admin-toggle-publish', isAuthenticated(Admin), authorizeUser("Admin"), adminToggleExamResult)

module.exports = examResultsRouter