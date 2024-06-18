const express = require('express')
const { AdminRegisterStudent, loginStudent, studentProfile, getStudentsByAdmin, getStudentByAdmin, studentUpdateProfile, adminUpdateStudent, writeExam } = require('../../Controllers/students/studentCtrl')
const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authenticateStudent, authorizeStudent } = require('../../middlewares/studentAuth')
const studentRouter = express.Router()

studentRouter.post('/admin/register',authenticateAdmin,authorizeAdmin, AdminRegisterStudent)
studentRouter.post('/login', loginStudent)
studentRouter.get('/profile',authenticateStudent,authorizeStudent,studentProfile )
studentRouter.get('/admin',authenticateAdmin,authorizeAdmin, getStudentsByAdmin)
studentRouter.get('/:studentID/admin',authenticateAdmin,authorizeAdmin,getStudentByAdmin)
studentRouter.patch('/update',authenticateStudent,authorizeStudent,studentUpdateProfile)
studentRouter.patch('/exam/:examID/write',authenticateStudent,authorizeStudent,writeExam)
studentRouter.patch('/:studentID/update/admin',authenticateAdmin,authorizeAdmin, adminUpdateStudent)


module.exports = studentRouter