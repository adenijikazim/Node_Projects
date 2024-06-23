const {StatusCodes} = require('http-status-codes')
const User = require('../Model/userModel')
// const User = require('../models/userModel')


/////////////////GET ALL USERS///////////
const getAllUsers = async(req,res)=>{
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({
        message:"All users fetched successfully",
        length:users.length,
        data:{users}
        
    })
}



/////////////////GET A USER///////////
const getUser = async(req,res,next)=>{
    const user = await User.findById(req.params.userId).select('-password')
    if(!user)
    {
        const error = new Error(`No user found`)
        return next(error)
    }
    res.status(StatusCodes.OK).json(user)

}

/////////////////GEt USER PROFILE///////////
const getUserProfile = async(req,res)=>{
    console.log(req.user)
    res.status(StatusCodes.OK).json({user:req.user})
}


/////////////////UPDATE A USER///////////
const updateUser = async(req,res,next)=>{
    const {name,email} = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {name,email}, {runValidators:true, new:true})
    if(!updatedUser){
        const error = new Error(`No user with the id ${req.params.userId}`)
        return next(error)
    }
    res.status(StatusCodes.OK).json(updatedUser)

}


/////////////////UPDATE USER PASSWORD///////////
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


/////////////////DELETE A USER///////////
const deleteUser = async(req,res)=>{
    await User.findByIdAndDelete(req.params.userId)
    res.status(StatusCodes.OK).json({message:'user deleted successfully'})

}

module.exports = {getAllUsers,getUser,updateUser,deleteUser,getUserProfile,updateUserPassword}


