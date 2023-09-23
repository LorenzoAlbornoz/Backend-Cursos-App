const mongoose = require ("mongoose");
const Categoria = require("./categoriaSchema");

const cursoSchema = new mongoose.Schema({
    title: {
        type: String, 
        require: true
    },
    imagen:{
        type: String,
        require: true,
    },
    detalle:{
        type: String,
        require: true,
    },
    video: {
        type:String,
        require: true
    },
    mentor: {
        type:String,
        require:true
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
