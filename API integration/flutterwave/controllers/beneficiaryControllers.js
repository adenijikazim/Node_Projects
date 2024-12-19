const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY)

const createBeneficiary = async (req,res) => {

    try {
        const payload = {
            "account_number": "0009964440",
            "account_bank":"044", // This is the beneficiary’s bank code, you can use the List of Banks to retrieve a bank code.
            "beneficiary_name": 'Ade Bende'
        }
        const response = await flw.Beneficiary.create(payload)
        res.status(201).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const fetchAllBeneficiary = async (req,res) => {

    try {
       
        const response = await flw.Beneficiary.fetch_all()
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const fetchBeneficiary = async (req,res) => {

    try {
        const payload = {
            
            "id":"33675" //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
            
        }
        const response = await flw.Beneficiary.fetch(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const delBeneficiary = async (req,res) => {

    try {
        const payload = {
            
            "id":"33681" //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
            
        }
        const response = await flw.Beneficiary.delete(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


module.exports = {createBeneficiary,fetchAllBeneficiary,fetchBeneficiary,delBeneficiary}