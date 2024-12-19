
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createOTP = async (req,res) => {

    try {

        const payload = {
            "length": 7,
            "customer": {
                "name": "Kazan",
                "email": "kazan@mailinator.com",
                "phone": "2348131149273"
            },
            "sender": "Test Sender",
            "send": true,
            "medium": [
                "email",
                "whatsapp"
            ],
            "expiry": 5
        }

        const response = await flw.Otp.create(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const validateOTP = async (req,res) => {

    try {

        const payload = {
            "reference": "CF-BARTER-20190420022611377491",
            "otp": "481208"
        }

        const response = await flw.Otp.validate(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

module.exports = {createOTP,validateOTP}

