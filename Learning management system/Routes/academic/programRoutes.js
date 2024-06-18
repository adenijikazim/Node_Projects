const express = require('express')
const { createProgram, getPrograms, getProgram, updateProgram, deleteProgram } = require('../../Controllers/academics/programCtrl')
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const programRouter = express.Router()

programRouter.route('/')
.post(authenticateUser,authorizeUser('Admin'),createProgram)
.get(authenticateUser,authorizeUser('Admin'),getPrograms)


programRouter.route('/:id')
.get(authenticateUser,authorizeUser('Admin'),getProgram)
.patch(authenticateUser,authorizeUser('Admin'),updateProgram)
.delete(authenticateUser,authorizeUser('Admin'),deleteProgram)


module.exports = programRouter