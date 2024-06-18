const bcrypt = require('bcryptjs')

const hashPassword =async function(){
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(paswword, salt)
    return password

}

const comparePassword = async function(password){
    return await bcrypt.compare(candidatePassword, password)
}

module.exports = {hashPassword,comparePassword}