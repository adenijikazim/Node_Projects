const {StatusCodes}=require('http-status-codes')
const ExamResult = require('../../Models/academic/examResult')
const Student = require('../../Models/academic/student')
const jwt = require('jsonwebtoken')
const Admin = require('../../Models/Staff/adminModel')
const Exam = require('../../Models/academic/exam')

const AdminRegisterStudent = async(req,res)=>{
    const {name,email,password} = req.body

    const adminFound = await Admin.findById(req.userAuth.id)
    if(!adminFound){
        throw new Error('Admin not found')
    }
    const studentFound = await Student.findOne({email})
    if(studentFound){
        throw new Error('Student already registered')
    }
    const studentCreated = await Student.create({name,email,password,createdBy:req.userAuth.id})
    const studentToken = jwt.sign({id:studentCreated._id,role:studentCreated.role}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES})
    const oneDay = 1000*60*60*24*3
    res.cookie('token', studentToken,{
        httponly:true,
        // secure:true,
        expires:new Date(Date.now() + oneDay)
    
    })
    studentCreated.password = undefined

    // push student to admin
    adminFound.students.push(studentCreated._id)
    res.status(StatusCodes.OK).json({
        message:'student registered successfully',
        data:studentCreated
    })
}

const loginStudent = async(req,res)=>{
    const {email, password} = req.body
    const student = await Student.findOne({email})
    if(!student){
        throw new Error('Invalid login credentials')
    }
    const compare =await student.comparePassword(password)
    if(!compare){
        throw new Error('Invalid login credentials')
    }
    const studentToken = jwt.sign({id:student._id,role:student.role}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES})
    const oneDay = 1000*60*60*24*3
    res.cookie('token', studentToken,{
        httponly:true,
        // secure:true,
        expires:new Date(Date.now() + oneDay)
    })
    student.password = undefined
    res.status(StatusCodes.OK).json({
        message:'You are logged in',
        data:student
    })
} 

const getStudentsByAdmin = async(req,res)=>{
    const students = await Student.find().select('-password')
    res.status(StatusCodes.OK).json({
        message:'students fetched successfully',
        data:students
    })

}

const getStudentByAdmin = async(req,res)=>{
    const student = await Student.findById(req.params.studentID).select('-password')
    if(!student){
        throw new Error('no student found')
    }
    res.status(StatusCodes.OK).json({
        message:'student fetched successfully',
        data:student
    })

}

const studentProfile = async(req,res)=>{
    const student = await Student.findById(req.userAuth.id).select('-password')
    .populate('examResults')
    if(!student){
        throw new Error('student not found')
    }
    // get student profile
    const studentProfile = {
    name:student.name,
    email:student.email,
    currentClassLevel:student.currentClassLevel,
    program:student.program,
    dateAdmitted:student.dateAdmitted,
    isSuspended:student.isSuspended,
    isWithdrawn:student.isWithdrawn,
    studentId:student.studentId,
    prefectName:student.prefectName
    }

    // get student exam result
    const studentResults = student.examResults;


    // current exam
    const currentExamResult = studentResults[studentResults.length - 1]

    // check if exam published
    const isPublished = currentExamResult.isPublished
    res.status(StatusCodes.OK).json({
        message:'student profile fetched successfully',
        data:studentProfile,
        examresult:isPublished ? currentExamResult : []
    })

}



const studentUpdateProfile = async(req,res)=>{
    const {email}= req.body
    const student = await Student.findByIdAndUpdate(req.userAuth.id,{email},{runValidators:true, new:true}).select('-password')
    if(!student){
        throw new error('No student found')
    }
    res.status(StatusCodes.OK).json({
        message:'student name updated successfully',
        data:student

    })
}

// Admin updating student ////
const adminUpdateStudent = async(req,res)=>{
    const {classLevels, academicYear, program, name, email,prefectName,isSuspended,isWithdrawn} = req.body
    const studentFound = await Student.findById(req.params.studentID)
    if(!studentFound){
        throw new Error('student not found')
    }
    const student = await Student.findByIdAndUpdate(req.params.studentID,{
        $set:{name,email,academicYear,prefectName,program,isWithdrawn,isSuspended},
        $addToSet:{classLevels}
    },
    {runValidators:true, new:true})
    res.status(StatusCodes.OK).json({
        message:'profile updated successfully',
        data:student
    })

}


const updateStudentsPassword = async(req,res,next)=>{
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        const error = new Error('please enter old and new password')
        return next(error)
    }
    const student = await Student.findById(req.userAuth.id)
    if(!student){
        const error = new Error(`No user with the id ${req.userAuth.id}`)
        return next(error)
    }
    const isPasswordCorrect =await student.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        const error = new Error(`Incorrect password`)
        return next(error)
    }

    student.password = newPassword
    await student.save()
    res.status(StatusCodes.OK).json({message:'password changed successfully'})
}



    

/////////////////// STUDENT WRITE EXAM/////////////////
const writeExam = async(req,res)=>{
    // get students
    const studentFound = await Student.findById(req.userAuth.id)
    if(!studentFound){
        throw new Error('No student found')
    }

    // get exam 
    const examFound = await Exam.findById(req.params.examID)
    .populate('questions')
    .populate('academicTerm')
    if(!examFound){
        throw new Error('No exam found')
    }
    console.log({studentFound,examFound})

     ///// student taking exams////
    
    // check id student has already taken exams

    const studentTakenExams = await ExamResult.findOne({student:studentFound._id})
    if(studentTakenExams){
        throw new Error('You have already taken exams')
    }

    if(studentFound.isWithdrawn || studentFound.isSuspended){
        throw new Error('You are suspended/withdrawn, you cant take this exams')
    }



    // get questions 
    const questions = examFound.questions

    // get students answers 
    const studentAnswers = req.body.answers

    //  check if student answerered all questions 
    if(studentAnswers.length !== questions.length){
        throw new Error('please answer all questions')
    }

   
    // build report object
    let correctAnswers = 0
    let wrongAnswers = 0
    let totalQuestions=0
    let status = '' // failed or passes
    let grade = 0
    let remarks = ''
    let score = 0 
    let answeredQuestions = []

    
  
    // check for answers
    for (let i = 0; i<questions.length; i++){

        // find the question
        const question = questions[i]

        // check if answer is correct
        if(question.correctAnswer === studentAnswers[i]){ 
            correctAnswers++
            score++
            question.isCorrect = true

        }else{
            wrongAnswers++
        }
    }

       // calculate report
       totalQuestions=questions.length
       grade = (correctAnswers/questions.length)*100;
       answeredQuestions = questions.map(question=>{
           return {
               question:question.question,
               correctAnswer:question.correctAnswer,
               isCorrect:question.isCorrect
           }
       })

       
    //  check status
     if(grade>=50){
        status='passed'
    }else{status='failed'}

     // remarks
     if(grade>=80){
        remarks ='Excellent'
    }else if(grade >=70){
        remarks = "Very good"
    }else if(grade >= 60){
        remarks = 'Good'
    }else if(grade>=50){
        remarks='Fair'
    }else {
        remarks = 'Poor'
    }

    
// //  Generate exam result using examresults model
 const examResults = await ExamResult.create({
    studentID:studentFound.studentId,
    exam:examFound._id,
    grade,
    score,
    status,
    remarks,
    classLevel:examFound.classLevel,
    academicTerm:examFound.academicTerm,
    academicYear:examFound.academicYear,
    answeredQuestions
 })

// //  push the result into student
studentFound.examResults.push(examResults._id)
await studentFound.save()


// promoting student to 200 level
if(examFound.academicTerm.name === '3rd term' && grade ==='pass' && studentFound.currentClassLevel === 'Level 100'){
studentFound.classLevels.push('Level 200')
studentFound.currentClassLevel = 'Level 200'
await studentFound.save()
}

// promoting student to 300 level
if(examFound.academicTerm.name === '3rd term' && grade ==='pass' && studentFound.currentClassLevel === 'Level 200'){
studentFound.classLevels.push('Level 300')
studentFound.currentClassLevel = 'Level 300'
await studentFound.save()
}
// promoting student to 400 level
if(examFound.academicTerm.name === '3rd term' && grade ==='pass' && studentFound.currentClassLevel === 'Level 300'){
studentFound.classLevels.push('Level 400')
studentFound.currentClassLevel = 'Level 400'
await studentFound.save()
}

// promote student to graduate
if(examFound.academicTerm.name === '3rd term' && grade ==='pass' && studentFound.currentClassLevel === 'Level 400'){
    studentFound.isGraduated === true;
    studentFound.yearGraduated === new Date()   
    await studentFound.save()}


    res.status(StatusCodes.OK).json({
        message:'You have submitted your exam, check later for your results'
    })
    
   // send response 
   /*res.status(StatusCodes.OK).json({
    status: 'success',
        data:{
        correctAnswers,
        wrongAnswers,
        score,
        totalQuestions,
        grade,
        status,
        remarks,
        examResults
    }
   })*/

}

    



module.exports = {AdminRegisterStudent,
    loginStudent, getStudentsByAdmin,
    getStudentByAdmin,studentProfile,studentUpdateProfile,adminUpdateStudent,writeExam,updateStudentsPassword

}

