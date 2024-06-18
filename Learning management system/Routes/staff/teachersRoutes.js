const express = require('express')
const { registerTeacher, LoginTeacher, getAllTeachersAdmin,  getTeacherByAdmin, getTeacherProfile, teacherUpdateProfile, adminDeleteTeacher, adminUpdateTeacher } = require('../../Controllers/staff/teachersCtrl')
const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authenticateTeacher, authorizeTeacher } = require('../../middlewares/teacherAuth')
const teacherRouter = express.Router()

teacherRouter.post('/admin/register',authenticateAdmin,authorizeAdmin,registerTeacher)
teacherRouter.post('/login', LoginTeacher )
teacherRouter.get('/admin', authenticateAdmin,authorizeAdmin,  getAllTeachersAdmin)
teacherRouter.get('/profile',authenticateTeacher,authorizeTeacher, getTeacherProfile)
teacherRouter.get('/:teacherID/admin',authenticateAdmin,authorizeAdmin,  getTeacherByAdmin)
teacherRouter.patch('/update',authenticateTeacher,authorizeTeacher, teacherUpdateProfile)
teacherRouter.patch('/:teacherID/admin',authenticateAdmin,authorizeAdmin, adminUpdateTeacher)
teacherRouter.delete('/:teacherID/admin',authenticateAdmin,authorizeAdmin, adminDeleteTeacher)

module.exports = teacherRouter