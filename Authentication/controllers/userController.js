const {StatusCodes} = require('http-status-codes')
const User = require('../models/userModel')

const getAllUsers = async(req,res)=>{
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({
        message:"All users fetched successfully",
        length:users.length,
        data:{users}
        
    })
}


const getUser = async(req,res,next)=>{
    const user = await User.findById(req.params.userId).select('-password')
    if(!user)
    {
        const error = new Error(`No user found`)
        return next(error)
    }
    res.status(StatusCodes.OK).json(user)

}
const getUserProfile = async(req,res)=>{
    console.log(req.user)
    res.status(StatusCodes.OK).json({user:req.user})
}



const updateUser = async(req,res,next)=>{
    const {name,email} = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {name,email}, {runValidators:true, new:true})
    if(!updatedUser){
        const error = new Error(`No user with the id ${req.params.userId}`)
        return next(error)
    }
    res.status(StatusCodes.OK).json(updatedUser)

}

const updateUserPassword = async(req,res)=>{
    const {password,confirmPassword} = req.body
    const user = await User.findById(req.user.id).select('+password')
    if(!user){
        const error = new Error(`No user with the id ${req.user.id}`)
        return next(error)
    }
    const compare = user.comparePassword(password)
    if(!compare){
        const error = new Error(`Incorrect password`)
        return next(error)
    }

    user.password = confirmPassword
    await user.save()
    res.status(StatusCodes.OK).json({message:'password changed successfully'})
}

const deleteUser = async(req,res)=>{
    await User.findByIdAndDelete(req.params.userId)
    res.status(StatusCodes.OK).json({message:'user deleted successfully'})

}

module.exports = {getAllUsers,getUser,updateUser,deleteUser,getUserProfile,updateUserPassword}