const express = require('express')
const { AdminRegisterStudent, loginStudent, studentProfile, getStudentsByAdmin, getStudentByAdmin, studentUpdateProfile, adminUpdateStudent, writeExam } = require('../../Controllers/students/studentCtrl')
// const { authenticateAdmin, authorizeUser('Admin') } = require('../../middlewares/adminAuth')
// const { authenticateUser, authorizeStudent } = require('../../middlewares/studentAuth')
const { authorizeUser, authenticateUser } = require('../../middlewares/isAuthenticated')
const studentRouter = express.Router()

studentRouter.post('/admin/register',authenticateUser,authorizeUser('Admin'), AdminRegisterStudent)
studentRouter.post('/login', loginStudent)
studentRouter.get('/profile',authenticateUser,authorizeUser('Student'),studentProfile )
studentRouter.get('/admin',authenticateUser,authorizeUser('Admin'), getStudentsByAdmin)
studentRouter.get('/:studentID/admin',authenticateUser,authorizeUser('Admin'),getStudentByAdmin)
studentRouter.patch('/update',authenticateUser,authorizeUser('Student'),studentUpdateProfile)
studentRouter.patch('/exam/:examID/write',authenticateUser,authorizeUser('Student'),writeExam)
studentRouter.patch('/:studentID/update/admin',authenticateUser,authorizeUser('Admin'), adminUpdateStudent)


module.exports = studentRouter