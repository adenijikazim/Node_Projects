const headers = {
    Authentication:`Bearer process.env.SECRET_KEY`  ,
    'Content-Type':'application/json'

}
module.exports = headers
