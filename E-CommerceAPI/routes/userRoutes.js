const express = require('express')
const {authenticateUser,authorizeUser} = require('../middleware/authenticate')
const { updateUser, updateUserPassword, getUser, getAllUsers, getUserProfile, deleteUser } = require('../controllers/userController')
// const { authorizeUser, authenticateUser } = require('../middleware/full-auth')
const userRouter = express.Router()

userRouter.route('/').get(authenticateUser,authorizeUser('admin'), getAllUsers)
userRouter.get('/profile',authenticateUser, getUserProfile)

userRouter.patch('/update', authenticateUser,updateUser)

userRouter.route('/:id')
.get(authenticateUser,authorizeUser('admin'),getUser)
.patch(authenticateUser,updateUserPassword)
.delete(authenticateUser,authorizeUser('admin'),deleteUser)

module.exports = userRouter