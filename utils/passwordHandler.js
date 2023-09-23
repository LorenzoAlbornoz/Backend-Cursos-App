const bcrypt = require("bcryptjs")

const encryptPassword = (password) => {
    // el metodo hashSync toma la contraseña y le pasamos otro parametro que se llama rondas, es como la cantidad de encriptacion. te pide un numero aleatorio para el tamaño del hash de la contraseña
    const hash = bcrypt.hashSync(password, parseInt(process.env.ROUNDS));
    return hash
}

const comparePassword = (password, hash) => {
    // el metodo compareSync lo que hace internamente es comparar las contraseñas, lo desencripta de forma interna y te devuelve un bolenao
    const isValid = bcrypt.compareSync(password, hash)
    return isValid
}

module.exports = {
    encryptPassword,
    comparePassword
}