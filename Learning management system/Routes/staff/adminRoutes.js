const express = require('express')
const { register, login, 
    getAllAdmins, deleteAdmin, updateAdmin, 
    adminSuspendTeacher, adminUnSuspendTeacher, 
    adminWithdrawTeacher, adminUnwithdrawTeacher, adminpublishExamResult, 
    adminUnpublishExamResult, 
    getAdminProfile} = require('../../Controllers/staff/adminController')
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authorizeUser, authenticateUser } = require('../../middlewares/isAuthenticated')
const adminRouter = express.Router()

adminRouter.post('/register',register)
adminRouter.post('/login',login)
// adminRouter.get('/',authenticateAdmin,authorizeAdmin, getAllAdmins)
adminRouter.get('/',authenticateUser,authorizeUser('Admin'), getAllAdmins)

adminRouter.get('/profile',authenticateUser, getAdminProfile)

adminRouter.route('/:id')
.patch(authenticateUser,authorizeUser('Admin'),updateAdmin)
.delete( authenticateUser,authorizeUser('Admin'),deleteAdmin)

// adminRouter.patch('/suspend/teacher/:id', adminSuspendTeacher)
// adminRouter.patch('/unsuspend/teacher/:id', adminUnSuspendTeacher)
// adminRouter.patch('/withdraw/teacher/:id', adminWithdrawTeacher)
// adminRouter.patch('/unWithdraw/teacher/:id', adminUnwithdrawTeacher)
// adminRouter.patch('/publish/exam/:id', adminpublishExamResult)
// adminRouter.patch('/unpublish/exam/:id', adminUnpublishExamResult)



module.exports = adminRouter