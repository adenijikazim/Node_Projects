const express = require('express')
const { createYearGroup, getYearGroup, getYearGroups, updateYearGroup, deleteYearGroup } = require('../../Controllers/academics/yearGroupCtrl')
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const yearGroupRouter = express.Router()


yearGroupRouter.route('/')
.post(authenticateUser,authorizeUser('Admin'),createYearGroup)
.get(authenticateUser,authorizeUser('Admin'),getYearGroups)


yearGroupRouter.route('/:id')
.get(authenticateUser,authorizeUser('Admin'),getYearGroup)
.patch(authenticateUser,authorizeUser('Admin'),updateYearGroup)
.delete(authenticateUser,authorizeUser('Admin'), deleteYearGroup)

module.exports = yearGroupRouter