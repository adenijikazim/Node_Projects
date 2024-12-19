require('dotenv').config()
const express = require('express')
const billsRouter = require('./routes/billsRoutes')
const transferRouter = require('./routes/transferRoutes')
const bankRouter = require('./routes/banksRoutes')
const beneficiaryRouter = require('./routes/beneficiaryRoutes')
const otpRouter = require('./routes/otpRoutes')
const subscriptionRouter = require('./routes/subscriptionRoutes')

const app = express()

app.use(express.json())

app.use('/bills', billsRouter)
app.use('/transfer', transferRouter)
app.use('/banks', bankRouter)
app.use('/beneficiary', beneficiaryRouter)
app.use('/otp', otpRouter)
app.use('/subscription', subscriptionRouter)


const PORT=process.env.PORT || 4200
app.listen(PORT, console.log(`app is listening on port ${PORT}`))