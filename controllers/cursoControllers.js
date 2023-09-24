const mongoose = require("mongoose");
const Curso = require("../models/cursoSchema");
const cloudinary = require("cloudinary").v2

const getAllCuorses = async (req, res) => {
    const cursos = await Curso.find().populate("categoria")

    try {
        if (!cursos) {
            return res.status(404).json({
                mensaje: "Cursos no encontrados",
                status: 404
            });
        }

        return res.status(200).json({
            mensaje: "Cursos encontrados",
            status: 200,
            cursos
        });

    } catch {
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        })
    }
}

const getCourseByID = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    try {
        // compara si los id son correcpondientes.
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                mensaje: "Id inválido",
                status: 400,
            });
        }
        if (!curso) {
            return res.status(404).json({
                mensaje: "Curso no encontrado",
                status: 404,
            });
        }

        return res.status(200).json({
            mensaje: "Curso encontrado",
            status: 200,
            curso
        });
    } catch (error) {
        // error de servidor 500
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        });
    }
};

const createCourse = async (req, res) => {
    const { title, detalle, video, mentor, img_mentor, categoria } = req.body;
    // la imagen viene como tipo file
    const {path} = req.file;
    const curso = await Curso.findOne({ title });
    const cloudImg = await cloudinary.uploader.upload(path);

    console.log(req.file)

    try {
        if (curso) {
            return res.status(400).json({
                mensaje: "El Curso ya existe",
                status: 400
            })
        }
        const newCurso = new Curso({
            title,
            imagen: cloudImg.secure_url,
            detalle,
            video,
            mentor,
            img_mentor,
            categoria
        })
        await newCurso.save();

        return res.status(201).json({
            mensaje: "Curso creado correctamente",
            status: 201,
            newCurso
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: error,
            status: 500
        })
    }
}

const deleteCourse = async (req, res) => {
    const { id } = req.params
    const curso = await Curso.findByIdAndDelete(id)

    try {
        if (!curso) {
            return res.status(404).json({
                mensaje: "Curso no encontrado",
                status: 404
            })
        }
        return res.status(200).json({
            mensaje: "Curso eliminado Correctamente",
            status: 200,
            curso
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500,
            error
        })
    }
}

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, detalle, video, mentor, img_mentor, categoria } = req.body
    try {
    const curso = await Curso.findByIdAndUpdate( id,{
        title,
        detalle,
        video,
        mentor,
        img_mentor,
        categoria
    }, { new: true });
    if (!curso) {
      return res.status(404).json({
        mensaje: "Curso no encontrado",
        status: 404
      });
    }
  
    return res.status(200).json({
      mensaje: "Curso modificado correctamente",
      status: 200,
      curso
    });
    } catch (error) {
      return res.status(500).json({
        mensaje: "Hubo un error, inténtelo más tarde",
        status: 500
      });
    }
  };

module.exports = {
    getAllCuorses,
    createCourse,
    getCourseByID,
    deleteCourse,
    updateCourse
}
