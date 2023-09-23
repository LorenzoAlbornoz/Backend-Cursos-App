const mongoose = require ("mongoose")

// este esquema nos indica como se van a guardar los datos en nuestra base de dato. este metodo Schema recibe un objeto como parametro y dentro agregamos los datos que necesitamos
const userSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        require: true,
        trim: true,
    },
    username:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: [true, "Tiene espacios"]
    },
    rol: {
        type:String,
        default: "user",
        enum: ["user", "admin"]
    }
})

// indicamos que en esta variable vamos a guardar el modelo. este tiene un nombre como primer parametro y el esquema como segundo parametro
const User = mongoose.model("User", userSchema)
module.exports = User;
