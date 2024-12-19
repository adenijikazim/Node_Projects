const express = require('express')
const { getBanks, getBranches } = require('../controllers/banksController')
const bankRouter = express.Router()


bankRouter.get('/', getBanks)
bankRouter.get('/branches', getBranches)

module.exports = bankRouter