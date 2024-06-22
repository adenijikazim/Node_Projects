const express = require('express')
const { register, login, 
    getAllAdmins, deleteAdmin, updateAdmin, getAdminProfile,updateAdminPassword} = require('../../Controllers/staff/adminController')
const { authorizeUser, authenticateUser } = require('../../middlewares/isAuthenticated')
const adminRouter = express.Router()

adminRouter.post('/register',register)
adminRouter.post('/login',login)
adminRouter.get('/',authenticateUser,authorizeUser('Admin'), getAllAdmins)

adminRouter.get('/profile',authenticateUser, getAdminProfile)
adminRouter.patch('/updatePassword', authenticateUser, updateAdminPassword)

adminRouter.route('/:id')
.patch(authenticateUser,authorizeUser('Admin'),updateAdmin)
.delete( authenticateUser,authorizeUser('Admin'),deleteAdmin)





module.exports = adminRouter