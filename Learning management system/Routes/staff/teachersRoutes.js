const express = require('express')
const { registerTeacher, LoginTeacher, getAllTeachersAdmin,  getTeacherByAdmin, getTeacherProfile, teacherUpdateProfile, adminDeleteTeacher, adminUpdateTeacher } = require('../../Controllers/staff/teachersCtrl')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
// const { authenticateTeacher, authorizeTeacher } = require('../../middlewares/teacherAuth')
const teacherRouter = express.Router()

teacherRouter.post('/admin/register',authenticateUser,authorizeUser('Admin'),registerTeacher)
teacherRouter.post('/login', LoginTeacher )
teacherRouter.get('/admin', authenticateUser,authorizeUser('Admin'),getAllTeachersAdmin)
teacherRouter.get('/profile',authenticateUser,authorizeUser('Teacher'), getTeacherProfile)
teacherRouter.get('/:teacherID/admin',authenticateUser,authorizeUser('Admin'),  getTeacherByAdmin)
teacherRouter.patch('/update',authenticateUser,authorizeUser('Teacher'), teacherUpdateProfile)
teacherRouter.patch('/:teacherID/admin',authenticateUser,authorizeUser('Admin'), adminUpdateTeacher)
teacherRouter.delete('/:teacherID/admin',authenticateUser,authorizeUser('Admin'), adminDeleteTeacher)

module.exports = teacherRouter