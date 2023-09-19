const pool = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const jwtPassword = require('../passwordJwt');
const { json } = require("express");

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({
      message: "O campo nome é obrigatório!",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "O campo e-mail é obrigatório!",
    });
  }

  if (!senha) {
    return res.status(400).json({
      message: "O campo senha é obrigatório!",
    });
  }

  try {
    const { rowCount } = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (rowCount > 0) {
      return res.status(400).json({
        message: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const passwordEncrypt = await bcrypt.hash(senha, 10);

    const { rows } = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) returning *",
      [nome, email, passwordEncrypt]
    );

    const { senha: _, ...user } = rows[0];

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body

  if (!email) {
    return res.status(400).json({
      message: "O campo e-mail é obrigatório!",
    });
  }

  if (!senha) {
    return res.status(400).json({
      message: "O campo senha é obrigatório!",
    });
  }

  try {
    const { rows, rowCount } = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email])

    if (rowCount === 0) {
      return res.status(404).json({ message: "Usuário e/ou senha inválido(s)." })
    }

    const { senha: passwordHash, ...user } = rows[0]

    const correctPassword = await bcrypt.compare(senha, passwordHash)

    const token = jwt.sign({ id: user.id }, jwtPassword, { expiresIn: '8h' })

    return correctPassword
      ? res.json({ usuario: user, token })
      : res.status(404).json({ message: "E-mail e/ou senha inválidos!" });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }

}

module.exports = {
  createUser,
  login
};