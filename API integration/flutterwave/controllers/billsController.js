const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);



const createBill = async (req,res) => {
    // const {country,customer,amount,recurrence,type,reference} = req.body

    try {
        const payload={
            "country": "NG",
            "customer": "+23490803840303",
            "amount": 500,
            "recurrence": "ONCE",
            "type": "AIRTIME",
            "reference": "9300ko984"
        }
        
        const response = await flw.Bills.create_bill(payload)
        res.status(201).json(response)
        console.log(response);
    } catch (error) {
        console.log(error.message)
    }

}

const createBulkBills = async(req,res)=>{
    try {
        const payload={
            "bulk_reference": "edf-12de5223d2f32",
            "callback_url": "https://webhook.site/5f9a659a-11a2-4925-89cf-8a59ea6a019a",
            "bulk_data": [
                {
                    "country": "NG",
                    "customer": "+23490803840303",
                    "amount": 500,
                    "recurrence": "WEEKLY",
                    "type": "AIRTIME",
                    "reference": "930049200929"
                },
                {
                    "country": "NG",
                    "customer": "+23490803840304",
                    "amount": 500,
                    "recurrence": "WEEKLY",
                    "type": "AIRTIME",
                    "reference": "930004912332"
                }
            ]
        }
        
        const response = await flw.Bills.create_bulk(payload)
        res.status(201).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

const getBillerCategory=async(req,res)=>{
    try {
    
        const response = await flw.Bills.fetch_bills_Cat()
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

const getBillAgencies=async(req,res)=>{
    try {
    
        const response = await flw.Bills.fetch_bills_agencies()
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const createOrder = async(req,res)=>{
    try {

        const payload = {
            "id": "3644",
            "product_id": "OT151",
            "amount": "3500.00",
            "reference": "FLWTTOT1000000029",
            "country": "NG",
            "customer": {
                "name": "emmanuel",
                "email": "emmanuel@x.com",
                "phone_number": "08060811638"
            },
            "fields": [
                {
                    "id": "42107711:42107712",
                    "quantity": "1",
                    "value": "3500"
                },
                {
                    "id": "42107710",
                    "quantity": "1",
                    "value": "t@x.com"
                }
            ]
        }

        const response = await flw.Bills.create_ord_billing(payload)
        res.status(201).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

const getPoductUnderAgencies = async(req,res)=>{
    try {

        const payload = {
            "id": "BIL136" //This is the biller's code
        }

        const response = await flw.Bills.products_under_agency(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createBill,getBillerCategory,getBillAgencies,createOrder,createBulkBills,getPoductUnderAgencies
}