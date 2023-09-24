// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const User = require("../models/userSchema.js");
const {
  encryptPassword,
  comparePassword,
} = require("../utils/passwordHandler.js");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    if (!users) {
      return res.status(404).json({
        mensaje: "Usuarios no encontrados",
        status: 404,
      });
    }

    return res.status(200).json({
      mensaje: "Usuarios encontrados",
      status: 200,
      users,
    });
  } catch (error) {
    // error de servidor 500
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    // compara si los id son correcpondientes.
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "Id inválido",
        status: 400,
      });
    }

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    return res.status(200).json({
      mensaje: "Usuario encontrado",
      status: 200,
      user
    });
  } catch (error) {
    // error de servidor 500
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500
    });
  }
};

const register = async (req, res) => {
  const { nombre, username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (user) {
      return res.status(400).json({
        mensaje: "El usuario ya existe",
        status: 400,
      });
    }

    const newUser = new User({
      nombre,
      username,
      password: encryptPassword(password)
    });

    await newUser.save();
    res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      status: 201,
      newUser,
    });
  } catch (error) {
    // error de servidor 500
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

// los json web token (jwt) es una forma de representar informacion estructurada, de compartir imformacion de forma segura y compacto. los token son utilizados para autonticar un usuario y mandar info entre cliente y servidor. jwt.io es un libreria para poder hacer
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const secret = process.env.JWT_SECRET;
  try {
    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }
    if (!comparePassword(password, user.password)) {
      return res.status(400).json({
        mensaje: "La contraseña es invalida",
        status: 400,
      });
    }
    const payload = {
      sub: user._id,
      email: user.username,
      nombre: user.nombre,
      rol: user.rol
    };
    // firma, recibe tres parametros
    const token = jwt.sign(payload, secret, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: "12h"
    });
    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      status: 200,
      token
    });
  } catch (error) {
    // error de servidor 500
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500
    });
  }
};

const changeToAdmin = async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;
  const user = await User.findById(id);
  try {
    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    user.rol = rol;
    await user.save();
    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      status: 200,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "Id inválido",
        status: 400,
      });
    }

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    return res.status(200).json({
      mensaje: "Usuario borrado correctamente",
      status: 200,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, username, password } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "Id inválido",
        status: 400,
      });
    }
    // es un metodo que recibe 3 parametros, el primero el id, el segundo un objeto y el tercero un new: true, todo lo que hace el update lo guarda en una base y remplaza los datos ya creados o usuarios ya creados. nos aseguramos de que no se genere un usuario nuevo y que se guarde correctamente en la base.
    if(req.body.password){
    const user = await User.findByIdAndUpdate(
      id,
      {
        ...req.body,
        nombre,
        username,
        password: encryptPassword(password)
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404
      });
    }

    return res.status(200).json({
      mensaje: "Usuario modificado correctamente",
      status: 200,
      user
    });
  }
  const user = await User.findByIdAndUpdate(
    id,
    {
      ...req.body,
      nombre,
      username
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
      status: 404
    });
  }

  return res.status(200).json({
    mensaje: "Usuario modificado correctamente",
    status: 200,
    user
  });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500
    });
  }
};

module.exports = {
  getAllUsers,
  register,
  changeToAdmin,
  getUserByID,
  deleteUser,
  login,
  updateUser
};

