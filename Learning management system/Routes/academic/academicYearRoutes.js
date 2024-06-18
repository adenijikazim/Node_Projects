const express = require('express')
const academicYearRouter = express.Router()
const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { createAcademicYear, getAcademicYears, getAcademicYear, updateacademicYear, deleteAcademicYear } = require("../../Controllers/academics/academicYearCtrl")


academicYearRouter.route('/')
.post(authenticateAdmin,authorizeAdmin ,createAcademicYear)
.get(authenticateAdmin,authorizeAdmin, getAcademicYears)

academicYearRouter.route('/:id')
.get(authenticateAdmin,authorizeAdmin, getAcademicYear)
.patch(authenticateAdmin,authorizeAdmin, updateacademicYear)
.delete(authenticateAdmin,authorizeAdmin, deleteAcademicYear)

module.exports = academicYearRouter