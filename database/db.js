const mongoose = require("mongoose")

const dbConnection = async () => {
    try{
        // metodo para conectar nuestra base de datos. el primer valor es la url de mongo db y el segundo valor es un objeto con configuraciones
    await mongoose.connect(process.env.DB_CONNECTION, {
        dbName: "Comision49i",
        // nos permite trabajar con la nueva y la vieja version
        useNewUrlParser: true,
        // para monitoreo de servidor
        useUnifiedTopology: true
    })
    console.log("Base de datos conectada")
    }catch (error){
    console.log(error)
    // agregamos un proceso, cuando hay alguna falla en la base de datos detiene el proceso
    process.exit(1)
    }
}

module.exports = dbConnection;