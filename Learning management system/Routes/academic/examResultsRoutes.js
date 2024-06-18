const express = require('express')
const { getAllExamResults, adminToggleExamResult, checkExamResults } = require('../../Controllers/academics/examResultsCtrl')
const { authenticateStudent, authorizeStudent } = require('../../middlewares/studentAuth')
const examResultsRouter = express.Router()

examResultsRouter.get('/',authenticateStudent,authorizeStudent,getAllExamResults )
examResultsRouter.get('/:id/checking',authenticateStudent,authorizeStudent, checkExamResults)
examResultsRouter.patch('/:id/admin-toggle-publish',authenticateStudent,authorizeStudent,adminToggleExamResult)
// examResultsRouter.patch('/:id/admin-toggle-publish', isAuthenticated(Admin), authorizeUser("Admin"), adminToggleExamResult)

module.exports = examResultsRouter