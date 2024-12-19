const express = require('express')
const { createBill, getBillerCategory, getBillAgencies, createOrder, createBulkBills, getPoductUnderAgencies } = require('../controllers/billsController')

const billsRouter = express.Router()

billsRouter.post('/createBills', createBill)
billsRouter.get('/getBills', getBillerCategory)
billsRouter.get('/getBillsAgencies', getBillAgencies)
billsRouter.post('/createBillOrder', createOrder)
billsRouter.post('/bulkBills', createBulkBills)
billsRouter.get('/products/agency', getPoductUnderAgencies)

module.exports = billsRouter