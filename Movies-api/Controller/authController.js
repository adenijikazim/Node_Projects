const {StatusCodes} = require('http-status-codes')
const customError = require('../utils/customError')
const User = require('../Model/userModel')
const signToken = require('../utils/generateToken')


// REGISTER USER
const register = async(req,res,next)=>{
    const {name,email,password,confirmPassword,role} = req.body
    if(!name || !email || !password || !confirmPassword){
        const error = new customError('please enter all required fields', 401)
        return next(error)
    }

    // const emailAlreadyRegistered = await User.findOne({email})
    const emailAlreadyRegistered = await User.findOne({email})
    if(emailAlreadyRegistered){
        const error= new customError('User already Registered')
        return next(error)
    }
    const user = await User.create({name,email,password,confirmPassword,role})
    
        const token = signToken(user._id)
        const fourDays = 1000*60*60*24*4
        res.cookie('token', token,{
            httpOnly:true,
            // secure:true,
            expires:new Date(Date.now()+fourDays),
        })

    res.status(StatusCodes.CREATED).json({
        status:"success",
        message:`${user.email} has registered`
    })


}


// LOGIN USER
const login = async(req,res,next)=>{
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(!user){
        const error = new customError('Invalid login credentials', 401)
        return next(error)
    }

    const compare = user.comparePassword(password)
    if(!compare){
        const error = new customError('Incorrect email or password', 401)
        return next(error)
    }
    // const userData={name:user.name,user:user.email, role:user.role}
    // const token = jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET,
    //     {expiresIn:process.env.JWT_EXPIRE})
        const token = signToken(user._id)
        const fourDays = 60*60*24*4*1000
        res.cookie('token',token, {
            httpOnly:true,
            // secure:true,
            expires:new Date(Date.now()+fourDays)
        })
    res.status(StatusCodes.OK).json({user:`${user.email} has logged in`})
}

const logout = async (req,res)=>{
    res.cookie('token', 'logout',{
        httpOnly:true,
        expires:new Date(Date.now()+5*1000),
    })
    res.status(StatusCodes.OK).json({msg:"user has logged out"})


}

module.exports={
    register,
    login,
    logout,
}