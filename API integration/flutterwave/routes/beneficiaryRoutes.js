const express = require('express')
const { createBeneficiary, fetchAllBeneficiary, fetchBeneficiary, delBeneficiary } = require('../controllers/beneficiaryControllers')
const beneficiaryRouter = express.Router()


beneficiaryRouter.post('/', createBeneficiary)
beneficiaryRouter.get('/', fetchAllBeneficiary)
beneficiaryRouter.get('/single', fetchBeneficiary)
beneficiaryRouter.delete('/', delBeneficiary)

module.exports = beneficiaryRouter