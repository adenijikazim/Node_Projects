const express = require('express')
const { getSubject, createSubject, getSubjects, updateSubject, deleteSubject } = require('../../Controllers/academics/subjectsCtrl')
const { authenticateAdmin,authorizeAdmin } = require('../../middlewares/adminAuth')
{authenticateAdmin}
const subjectRouter = express.Router()

subjectRouter.post('/:programId',authenticateAdmin, authorizeAdmin, createSubject)
subjectRouter.get('/',authenticateAdmin, authorizeAdmin,  getSubjects )

subjectRouter.route("/:id")
.get(authenticateAdmin, authorizeAdmin, getSubject)
.patch(authenticateAdmin, authorizeAdmin, updateSubject)
.delete(authenticateAdmin, authorizeAdmin, deleteSubject)

module.exports = subjectRouter