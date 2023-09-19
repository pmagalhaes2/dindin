const jwt = require("jsonwebtoken");
const jwtPassword = require("../passwordJwt");
const pool = require("../connection");

const validateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, jwtPassword);
    const { rowCount, rows } = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Usuário não autorizado!" });
    }

    const { senha: _, ...user } = rows[0];

    req.usuario = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
  }
};

module.exports = { validateUser };
