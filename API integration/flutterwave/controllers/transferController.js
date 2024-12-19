const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const initiateTransfer = async(req,res)=>{
    
    try {
        const payload = {
        "account_bank": "044", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
        "account_number": "0690000040",
        "amount": 599500,
        "narration": "Akhlm Pstmn Trnsfr xx007",
        "currency": "NGN",
        "reference": "akhlm-pstmnpyt-r02ens007_PMCKDU_1", //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
        "callback_url": "https://www.flutterwave.com/ng/",
        "debit_currency": "NGN"
    }

        const response = await flw.Transfer.initiate(payload)
        res.status(201).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

const createBulkTransfer = async (req,res) => {

    try {
        const payload = {
            "title": "Staff salary",
            "bulk_data": [
                {
                    "bank_code": "044",
                    "account_number": "0690000032",
                    "amount": 100,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "fhsfhsds"
                },
                {
                    "bank_code": "044",
                    "account_number": "0690000034",
                    "amount": 50,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "akhlmfhsfhsds"
                }
            ]
        }

        const response = await flw.Transfer.bulk(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const getAllTransfer = async (req,res) => {

    try {
        const payload = {
            "status":"success"
        }

        const response = await flw.Transfer.fetch(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const getATransfer = async () => {

    try {
        const payload = {
            "id":"akhlm-pstmnpyt-r02ens007_PMCKDU_1" // This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
        }

        const response = await flw.Transfer.get_a_transfer(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}



module.exports = {initiateTransfer,createBulkTransfer,getAllTransfer,getATransfer}