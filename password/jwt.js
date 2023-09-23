// Passport es una aplicacion de autenticacion. Proporciona estrategias para autenticar cualquier tipo de usuario. Funciona como un middlewares
const passportJWT = require("passport-jwt")
const User = require("../models/userSchema.js")

// el JWTStrategy se utiliza para configurar la estrategia
const JwtStrategy = passportJWT.Strategy;
// se utiliza para extraer el token de una solicitud http
const ExtractJwt = passportJWT.ExtractJwt;

// esta configuracion es un objeto
const config = {
    // extraemos el token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: process.env.JWT_ALGORITHM
}

   // payload es el contenido decodificado del jwt y el done es otro callback
const jwtStrategy = new JwtStrategy(config, async (payload, done) => {
    try {
     // payload es el dato que le cargo al jwt, sub es el id que esta dentro jwt.
        const user = await User.findById(payload.sub)
        if (!user) {
            return done(null, false)
        }
        // si es true
        done(null, user)

    } catch (error) {
        done(error, false)
    }
})

module.exports = jwtStrategy