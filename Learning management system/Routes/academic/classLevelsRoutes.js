const express = require('express')
const { createClassLevel, getClassLevel, deleteClassLevel, updateClassLevel, getClassLevels } = require('../../Controllers/academics/classLevelsCtrl')
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const classLevelRouter = express.Router()

classLevelRouter.route('/')
.post(authenticateUser,authorizeUser('Admin'),createClassLevel)
.get(authenticateUser,authorizeUser('Admin'),getClassLevels)

classLevelRouter.route('/:id')
.get(authenticateUser,authorizeUser('Admin'),getClassLevel)
.patch(authenticateUser,authorizeUser('Admin'),updateClassLevel)
.delete(authenticateUser,authorizeUser('Admin'),deleteClassLevel)

module.exports = classLevelRouter