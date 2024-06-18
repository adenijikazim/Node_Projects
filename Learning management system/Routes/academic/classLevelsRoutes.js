const express = require('express')
const { createClassLevel, getClassLevel, deleteClassLevel, updateClassLevel, getClassLevels } = require('../../Controllers/academics/classLevelsCtrl')
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const classLevelRouter = express.Router()

classLevelRouter.route('/')
.post(authenticateUser,authorizeUser('Admin'),createClassLevel)
.get(authenticateUser,authorize('Admin'),getClassLevels)

classLevelRouter.route('/:id')
.get(authenticateUser,authorize('Admin'),getClassLevel)
.patch(authenticateUser,authorize('Admin'),updateClassLevel)
.delete(authenticateUser,authorize('Admin'),deleteClassLevel)

module.exports = classLevelRouter