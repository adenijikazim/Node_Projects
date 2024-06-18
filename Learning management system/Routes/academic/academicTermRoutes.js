const express = require('express')
const { createAcademiTerm, getAcademicTerms, getAcademicTerm, updateAcademicTerm, deleteAcademicTerm } = require('../../Controllers/academics/academicTermCtrl')
const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const academicTermRouter = express.Router()

academicTermRouter.route('/')
.post(authenticateAdmin,authorizeAdmin,createAcademiTerm)
.get(authenticateAdmin,authorizeAdmin,getAcademicTerms)

academicTermRouter.route('/:id')
.get(authenticateAdmin,authorizeAdmin,getAcademicTerm)
.patch(authenticateAdmin,authorizeAdmin,updateAcademicTerm)
.delete(authenticateAdmin,authorizeAdmin,deleteAcademicTerm)

module.exports = academicTermRouter