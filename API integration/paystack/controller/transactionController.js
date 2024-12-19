const { PAYSTACK_TRANSACTION_VERIFY_URL, PAYSTACK_TRANSACTION_INIT_URL } = require("../constant")
const headers = require("../headers")
const transaction = require("../models/transactionModel")
var paystack = require('paystack')('sk_test_ec74ea7a7d142e841de86695027d3df824eaaadc');


const initializeTransaction = async(req,res)=>{
    // const payload = {...req.body}
    const {email,amount} = req.body
    const response = await paystack.transaction.initialize(req.body)
    if(response.status===true){
        const createTransaction = await transaction.create({
            email,
            amount,
            // paymentStatus,
            reference:response.data.reference,
            paymentLink:response.data.authorization_url
        })
        res.status(201).json({
            data:createTransaction
        })
      console.log(createTransaction)
      console.log(response)


    }
     
    // // const amountInKobo = amount*100
    // payload = {email,amountInKobo,reference}
    // const response = await axios.post(PAYSTACK_TRANSACTION_INIT_URL,JSON.stringify({"email": "customer@email.com",
    // "amount": "20000"}),headers)
    // return response.data
    // // let result =  response.data

    // // if(result && result.status){
    // //     const createTransacction = await transaction.create({})

    // // }

}
const verifyTransaction = async()=>{
    const verifyData = await axios.get(PAYSTACK_TRANSACTION_VERIFY_URL,{},headers)

}

module.exports = {initializeTransaction,verifyTransaction}