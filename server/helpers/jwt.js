const jwt = require('jsonwebtoken');
const secretCode = "secret"

const tokenGenerator = (user) =>{
    const {
        id,
        user_name,
        user_email,
        user_password,
        user_salt,
        user_birthdate,
        user_gender,
        user_avatar,
        user_type
      } = user
    let token = jwt.sign({
            id,
            user_name,
            user_email,
            user_password,
            user_salt,
            user_birthdate,
            user_gender,
            user_avatar,
            user_type
    },secretCode)
    return token;
}

const tokenVerifier = token =>{
    let decoded = jwt.verify(token,secretCode);
    return decoded;
}

module.exports = {
    tokenGenerator, tokenVerifier
}