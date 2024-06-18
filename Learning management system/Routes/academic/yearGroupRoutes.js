const express = require('express')
const { createYearGroup, getYearGroup, getYearGroups, updateYearGroup, deleteYearGroup } = require('../../Controllers/academics/yearGroupCtrl')
const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const yearGroupRouter = express.Router()


yearGroupRouter.route('/')
.post(authenticateAdmin,authorizeAdmin,createYearGroup)
.get(authenticateAdmin,authorizeAdmin,getYearGroups)


yearGroupRouter.route('/:id')
.get(authenticateAdmin,authorizeAdmin,getYearGroup)
.patch(authenticateAdmin,authorizeAdmin,updateYearGroup)
.delete(authenticateAdmin,authorizeAdmin, deleteYearGroup)

module.exports = yearGroupRouter