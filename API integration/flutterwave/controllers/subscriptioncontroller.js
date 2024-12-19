const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const fetchSubscription = async (req,res) => {

    try {
        
        const response = await flw.Subscription.fetch_all()
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

const getSubscription = async () => {

    try {
        const data = {
            "email": "cornelius@flutterwavego.com"
        }
        const response = await flw.Subscription.get(data)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

const cancelSubscription = async () => {

    try {
        const payload={
            "id":"4147" //This is the unique id of the subscription you want to cancel. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.cancel(payload)
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


const activateSubscription = async () => {

    try {
        const payload={
            "id":"4147" //This is the unique id of the subscription you want to activate. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.activate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


module.exports = {fetchSubscription,getSubscription,cancelSubscription,activateSubscription}