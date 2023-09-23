const mongoose = require ("mongoose")

const categoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Categoria = mongoose.model("Categoria", categoriaSchema);
module.exports = Categoria;
