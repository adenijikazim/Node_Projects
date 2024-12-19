const express = require('express')
const { createOTP, validateOTP } = require('../controllers/otpController')
const otpRouter = express.Router()

otpRouter.post('/', createOTP)
otpRouter.get('/', validateOTP)

module.exports = otpRouter