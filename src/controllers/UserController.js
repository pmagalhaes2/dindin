const pool = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtPassword = require("../passwordJwt");

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;

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
  const { email, senha } = req.body;

  try {
    const { rows, rowCount } = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Usuário e/ou senha inválido(s)." });
    }

    const { senha: passwordHash, ...user } = rows[0];

    const correctPassword = await bcrypt.compare(senha, passwordHash);

    const token = jwt.sign({ id: user.id }, jwtPassword, { expiresIn: "8h" });

    return correctPassword
      ? res.json({ usuario: user, token })
      : res.status(404).json({ message: "E-mail e/ou senha inválidos!" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const detailUser = async (req, res) => {
  const { id } = req.usuario;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );

    const { senha: _, ...user } = rows[0];

    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha } = req.body;

  try {
    const { rowCount } = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1 AND id <> $2",
      [email, id]
    );

    if (rowCount > 0) {
      return res.status(400).json({
        message:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const passwordEncrypt = await bcrypt.hash(senha, 10);

    await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4",
      [nome, email, passwordEncrypt, id]
    );

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};


module.exports = {
  createUser,
  login,
  detailUser,
  updateUser,
};
