const {StatusCodes} = require('http-status-codes')
const ClassLevel = require('../../Models/academic/classLevel')
const Admin = require('../../Models/Staff/adminModel')


const createClassLevel = async(req,res)=>{
    const {name, description} =req.body
    const classLevelFound = await ClassLevel.findOne({name})
    if(classLevelFound){
        throw new Error('class level already exists')
    }
    const classLevelcreated = await ClassLevel.create({name,description,createdBy:req.userAuth.id})
    const admin = await Admin.findById(req.userAuth.id)
    admin.classLevels.push(classLevelcreated._id)
    await admin.save()
    res.status(StatusCodes.CREATED).json({
        message:'successfully created',
        data:classLevelcreated
    })
}

const getClassLevels = async(req,res)=>{
    const classLevels = await ClassLevel.find()
    res.status(StatusCodes.OK).json({
        message:'class successfully fetched',
        data:classLevels
    })

}

const getClassLevel = async(req,res)=>{
    const classLevel = await ClassLevel.findById(req.params.id)
    res.status(StatusCodes.OK).json({
        message:'class level fetched successfully',
        data:classLevel
    })

}

const updateClassLevel = async(req,res)=>{
    const {name,description} = req.body
    const classLevelFound = await ClassLevel.findOne({name})
    if(classLevelFound){
        throw new Error('class name already exists')
    }
    const classLevel = await ClassLevel.findByIdAndUpdate(req.params.id,{name,description,createdBy:req.userAuth.id},{runValidators:true, new:true})
    res.status(StatusCodes.OK).json({
        message:'class Level updated sucessfully',
        data:classLevel
    })


}

const deleteClassLevel = async(req,res)=>{
    await ClassLevel.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({
        message:"Class level deleted successfully",
    })

}
module.exports ={createClassLevel,getClassLevels,getClassLevel,updateClassLevel,deleteClassLevel}