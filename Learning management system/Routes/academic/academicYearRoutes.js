const express = require('express')
const academicYearRouter = express.Router()
// const { authenticateAdmin, authorizeAdmin } = require('../../middlewares/adminAuth')
const { createAcademicYear, getAcademicYears, getAcademicYear, updateacademicYear, deleteAcademicYear } = require("../../Controllers/academics/academicYearCtrl")
const { authenticateUser, authorizeUser } = require('../../middlewares/isAuthenticated')


academicYearRouter.route('/')
.post(authenticateUser,authorizeUser('Admin') ,createAcademicYear)
.get(authenticateUser,authorizeUser('Admin'), getAcademicYears)

academicYearRouter.route('/:id')
.get(authenticateUser,authorizeUser('Admin'), getAcademicYear)
.patch(authenticateUser,authorizeUser('Admin'), updateacademicYear)
.delete(authenticateUser,authorizeUser('Admin'), deleteAcademicYear)

module.exports = academicYearRouter