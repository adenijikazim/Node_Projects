const express = require('express')
const { getAllUsers, getUserProfile, getUser, deleteUser, updateUserPassword, updateUser } = require('../Controller/userController')
const { authenticateUser, authorizeUser } = require('../middlewares/authMiddlware')
const userRouter = express.Router()

userRouter.get('/',[authenticateUser, authorizeUser('admin')], getAllUsers)

userRouter.route('/profile').get(authenticateUser, getUserProfile)

userRouter.route('/:userId')
.get([authenticateUser, authorizeUser('admin')], getUser)
.patch(authenticateUser, updateUser)
.delete(authenticateUser, authorizeUser('admin') , deleteUser)
.patch(authenticateUser, updateUserPassword)


module.exports = userRouter