const express = require('express')
const { getSubject, createSubject, getSubjects, updateSubject, deleteSubject } = require('../../Controllers/academics/subjectsCtrl')
// const { authenticateAdmin,authorizeAdmin } = require('../../middlewares/adminAuth')
const { authorizeUser, authenticateUser } = require('../../middlewares/isAuthenticated')
const subjectRouter = express.Router()

subjectRouter.post('/:programId',authenticateUser, authorizeUser('Admin'), createSubject)
subjectRouter.get('/',authenticateUser, authorizeUser('Admin'),  getSubjects )

subjectRouter.route("/:id")
.get(authenticateUser, authorizeUser('Admin'), getSubject)
.patch(authenticateUser, authorizeUser('Admin'), updateSubject)
.delete(authenticateUser, authorizeUser('Admin'), deleteSubject)

module.exports = subjectRouter