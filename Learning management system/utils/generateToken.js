const jwt = require('jsonwebtoken')
const payload = {
  id,role
}
const generateToken = ({payload})=>{
    return jwt.sign((payload), process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
}
module.exports = generateToken