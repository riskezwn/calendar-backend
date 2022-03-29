const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El correo electrónico ya está en uso"
      });
    };

    user = new User(req.body);
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No hay ninguna cuenta con ese email"
      });
    };

    // Confirm passwords
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      });
    };

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el administrador",
    });
  };
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};
module.exports = {
  createUser,
  loginUser,
  renewToken,
};
