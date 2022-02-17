const jwt = require('jsonwebtoken')
const secretCode = "rahasia"

const tokenGenerator = (user) =>{
    const { id,name, email, salt, birthdate, gender, avatar, type } = user
    let token = jwt.sign({
        id,name, email, salt, birthdate, gender, avatar, type
    },secretCode)
    return token

}
const tokenVerifier = token => {
    let decoded = jwt.verify(token,secretCode)
    return decoded
}

module.exports = {tokenGenerator,tokenVerifier}