
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const getBanks = async (req,res) => {

    try {
        const payload = {
            
            "country":"NG" //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
            
        }
        const response = await flw.Bank.country(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const getBranches = async (req,res) => {

    try {
        const payload = {
            
            "id":280 //Unique bank ID, it is returned in the call to fetch banks GET /banks/:country
            
        }
        const response = await flw.Bank.branches(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

module.exports ={getBanks,getBranches}