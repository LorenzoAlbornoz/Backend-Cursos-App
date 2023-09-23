// multer es una biblioteca de middlewares que se utiliza para manejar la carga de archivos en aplicaciones web. Nos permite recibir, almacenar y procesar archivos, enviados por los usuarios a traves del formulario
const multer = require("multer");
// es un objeto de node que nos permite acceder a los archivos dentro de nuestro escritorio o cualquier carpeta
const path = require ("path")

//tiene varias partes
module.exports = multer({
    // le indicamos donde queremos que se almacen los datos que le estamos mandando. es una configuracion por defecto. en este caso se guardan en el disco. 
 storage: multer.diskStorage({}),
 // el cb es callback
 fileFilter: (req, file, cb) => {
    // el formato. en este caso solo pusimos de img
    const fileTypes = /jpeg|jpg|png/ ;
    // verifica que el archivo que mandamos sea de tipo imagen o texto. 
    const mimeType = fileTypes.test(file.mimetype);
    // verifico que el nombre que le estoy pasando exista en la estencion. test es un booleano verificamos si la extencion del nombre original de archivo exista
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(mimeType && extname){
        // el true nos permite que se guarde la imagen correctamente. autorizamos a que la imagen se guarde
        return cb(null, true)
    }
    cb("Error: el tipo de archivo no esta permitido -" + fileTypes)
}
})