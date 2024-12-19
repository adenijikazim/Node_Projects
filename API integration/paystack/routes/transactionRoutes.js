const express = require('express')
const { initializeTransaction, verifyTransaction } = require('../controller/transactionController')
const transactionRouter = express.Router()

transactionRouter.post('/initialize', initializeTransaction)
transactionRouter.get(`/verify/:reference`, verifyTransaction)

module.exports = transactionRouter