const jwt = require('jsonwebtoken')


const getToken = id =>{
    return jwt.sign(id, process.env.JWT_SECRET)
}  


const setCookie = (res,name,value,options)=>{
res.cookie(res, name, value, options)

}


module.exports ={setCookie,getToken}



