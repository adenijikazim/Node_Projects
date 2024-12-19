const express = require('express')
const { initiateTransfer, createBulkTransfer, getAllTransfer, getATransfer } = require('../controllers/transferController')
const transferRouter = express.Router()

transferRouter.post('/', initiateTransfer )
transferRouter.post('/bulk', createBulkTransfer )
transferRouter.get('/', getAllTransfer )
transferRouter.get('/getTransfer', getATransfer )

module.exports = transferRouter