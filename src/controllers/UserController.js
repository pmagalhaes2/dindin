const pool = require("../connection");
const bcrypt = require("bcrypt");

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
      "select * from usuarios where email = $1",
      [email]
    );

    if (rowCount > 0) {
      return res.status(400).json({
        message: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const passwordEncrypt = await bcrypt.hash(senha, 10);

    const newUser = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) returning *",
      [nome, email, passwordEncrypt]
    );

    return res.status(201).json(newUser.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  createUser,
};
