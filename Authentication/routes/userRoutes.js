const express = require('express')
const { getAllUsers, getUser, updateUser, deleteUser, getUserProfile, updateUserPassword } = require('../controllers/userController')
const { authenticateUser, authorizeUser } = require('../Middlewares/authMiddlewares')
const userRouter = express.Router()

userRouter.get('/',[authenticateUser, authorizeUser('admin')], getAllUsers)

userRouter.route('/profile').get(authenticateUser, getUserProfile)

userRouter.route('/:userId')
.get([authenticateUser, authorizeUser('admin')], getUser)
.patch(authenticateUser, updateUser)
.delete(authenticateUser, authorizeUser('admin') , deleteUser)
.patch(authenticateUser, updateUserPassword)


module.exports = userRouter