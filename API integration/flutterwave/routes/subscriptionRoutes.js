const express = require('express')
const { fetchSubscription, getSubscription, cancelSubscription, activateSubscription } = require('../controllers/subscriptioncontroller')
const subscriptionRouter = express.Router()


subscriptionRouter.get('/',  fetchSubscription)
subscriptionRouter.get('/email', getSubscription)
subscriptionRouter.delete('/', cancelSubscription )
subscriptionRouter.get('/activate', activateSubscription)

module.exports = subscriptionRouter