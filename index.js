require("dotenv").config();
const express = require ("express");
const cors = require ("cors")
const morgan = require ("morgan");
// importamos el router
const router = require("./routes");
const dbConnection = require("./database/db");
const cloudinary = require("cloudinary").v2;
const jwtStrategy = require("./password/jwt");
const passport = require("passport");


const app = express();

//middlewares

app.use(cors())
app.options('*', cors())
app.use(express.json())
// se utiliza para analizar las solicitudes entrantes con datos solicitados en la url 
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

//passport investigar la estrategia local que usa usuario y contraseña
passport.use("jwt", jwtStrategy)

//cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.APY_KEY,
    api_secret: process.env.APY_SECRET
});

//Routing o direcionamiento se refiere a como se gestionan solicitudes http entrantes. definicion de rutas, parametros de ruta, enrutamiento modular, manejo de errores. 

//el objeto app es la instancia de express,el metodo get es la peticion http, primer parametro la ruta, segundo parametro una callback con la funcion
//req solicitud y res respuesta

// app.get("/", (req, res) => {
//     // mandamos una respuesta
//      res.send({
//         mensaje: "Hola a todos desde el backend, se agrega cambio"
//     })    
// })

// esto es un routing o diccionamiento, la / es la ruta principal. primero tenemos el app que es la instancia de express, despues tenemos el post que es el metodo de solicitud http. recibe dos parametros, el primero el path o via de acceso en el servidor y el segundo es el handled "el manejador" tiene como parametro el req que es la peticion y el res que es la respuesta.
// app.post('/', (req, res) => {
//     // destructuring
//     const {nombre} = req.body
//     console.log(req.body)
//     // enviamos un nombre al body
//     res.send({
//         nombre
//     })
// })

// con los params yo puedo obtener la informacion que pueda mandarle a traves de la url
// app.put('/:id', (req,res) => {
//     const userId = req.params.id
//     console.log(userId)
//     res.send(userId)
// }) 


// const port = process.env.PORT;

// dbConnection()

// configuracion rutas
app.use(process.env.API, router)
// puerto
const port = process.env.PORT || 8080;

// conexion base de datos
dbConnection()

//esta funcion recibe dos parametros el puerto y un callback
app.listen(port, () => {
    console.log(`mi servidor esta funcionando en el puerto ${port}`)
})

