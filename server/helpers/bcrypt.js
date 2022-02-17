const bcrypt = require ('bcrypt')
const saltRound = 10

const encrypter = (pwd) => {
    return bcrypt.hashSync(pwd,saltRound)
}

const decrypter = (pwd,hashPwd) => {
    return bcrypt.compareSync(pwd,hashPwd)
}

module.exports = {
    encrypter, decrypter
}