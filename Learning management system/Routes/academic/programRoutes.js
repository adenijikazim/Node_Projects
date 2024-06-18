const express = require('express')
const { createProgram, getPrograms, getProgram, updateProgram, deleteProgram } = require('../../Controllers/academics/programCtrl')
const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const programRouter = express.Router()

programRouter.route('/')
.post(authenticateAdmin,authorizeAdmin,createProgram)
.get(authenticateAdmin,authorizeAdmin,getPrograms)


programRouter.route('/:id')
.get(authenticateAdmin,authorizeAdmin,getProgram)
.patch(authenticateAdmin,authorizeAdmin,updateProgram)
.delete(authenticateAdmin,authorizeAdmin,deleteProgram)


module.exports = programRouter