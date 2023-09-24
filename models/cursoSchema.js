const mongoose = require ("mongoose");
const Categoria = require("./categoriaSchema");

const cursoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    imagen:{
        type: String
    },
    detalle:{
        type: String
    },
    video: {
        type:String
    },
    mentor: {
        type:String
    },
    img_mentor: {
        type:String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
    },
categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Categoria
}
})

const Curso = mongoose.model("Curso", cursoSchema)
module.exports = Curso;
