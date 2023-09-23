const Categoria = require("../models/categoriaSchema")

const getAllCategories = async (req, res) => {
    const categorias = await Categoria.find();
    try {
      if (!categorias) {
        return res.status(404).json({
          mensaje: "Categorias no encontradas",
          status: 404
        });
      }
  
      return res.status(200).json({
        mensaje: "Categorias encontrados",
        status: 200,
        categorias
      });
    } catch (error) {
      // error de servidor 500
      return res.status(500).json({
        mensaje: "Hubo un error, inténtelo más tarde",
        status: 500
      });
    }
  };

const createCategory = async (req, res) => {
    const { name } = req.body;
    const categoria = await Categoria.findOne({ name })

    try {
        if (categoria) {
            return res.status(404).json({
                mensaje: "Categoria ya existe",
            })
        }
        const newCategory = new Categoria({ name });
        await newCategory.save()

        return res.status(201).json({
            mensaje: "Categoria creada",
            status: 201,
            newCategory
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        });
    }
}

module.exports = {
    createCategory,
    getAllCategories
}