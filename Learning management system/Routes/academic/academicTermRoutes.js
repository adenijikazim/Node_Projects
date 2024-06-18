const express = require('express')
const { createAcademiTerm, getAcademicTerms, getAcademicTerm, updateAcademicTerm, deleteAcademicTerm } = require('../../Controllers/academics/academicTermCtrl')
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')
const academicTermRouter = express.Router()

academicTermRouter.route('/')
.post(authenticateUser,authorizeUser('Admin'),createAcademiTerm)
.get(authenticateUser,authorizeUser('Admin'),getAcademicTerms)

academicTermRouter.route('/:id')
.get(authenticateUser,authorizeUser('Admin'),getAcademicTerm)
.patch(authenticateUser,authorizeUser('Admin'),updateAcademicTerm)
.delete(authenticateUser,authorizeUser('Admin'),deleteAcademicTerm)

module.exports = academicTermRouter