const express = require('express')
const { createClassLevel, getClassLevel, deleteClassLevel, updateClassLevel, getClassLevels } = require('../../Controllers/academics/classLevelsCtrl')
const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const classLevelRouter = express.Router()

classLevelRouter.route('/')
.post(authenticateAdmin,authorizeAdmin,createClassLevel)
.get(authenticateAdmin,authorizeAdmin,getClassLevels)

classLevelRouter.route('/:id')
.get(authenticateAdmin,authorizeAdmin,getClassLevel)
.patch(authenticateAdmin,authorizeAdmin,updateClassLevel)
.delete(authenticateAdmin,authorizeAdmin,deleteClassLevel)

module.exports = classLevelRouter