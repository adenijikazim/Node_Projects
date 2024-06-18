// const jwt = require('jsonwebtoken')


// const authenticateAdmin = async(req,res)=>{
//     const token = res.cookie.token
//     if(!token){
//         throw new error(`please login to continue`)
//     }
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//         req.user = decodedToken
//         next()
//     } catch (error) {
//         throw new Error('Login expired, please login')
//     }
// }

// const authorizeAdmin = async(req,res)=>{
//     if(req.role.user !== 'admin') {
//         const error = new Error(`you aree not allowed to access this route`)
//         next(error)
//     }
// }

// module.exports = {
//     authenticateAdmin, authorizeAdmin
// }