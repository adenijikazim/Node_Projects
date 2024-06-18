const prodError = (res,error)=>{
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message
    })

}

const devError = (res,error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status:error.statusCode,
            message:error.message,
            stack:error.stack,
            error
        })

    }else{
        res.status(500).json({
            message:"Something went wrong"
        })

    }
   

}
module.exports = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500
    error.status = error.statusCode || 'error'

    if(process.env.NODE_ENV === 'development'){
        devError(res,error)
     

    }else if(process.env.NODE_ENV ==='production'){
        prodError(res,error)

    }
    

}