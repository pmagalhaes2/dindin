const pool = require("../connection");

const listCategories = async (req, res) => {
  const { id } = req.usuario;

  try {
    const { rowCount, rows } = await pool.query(
      `
    SELECT c.id, c.descricao
    FROM categorias c
    JOIN transacoes t ON t.categoria_id = c.id
    JOIN usuarios u ON u.id = t.usuario_id
    WHERE u.id = $1`,
      [id]
    );

    return rowCount > 0 ? res.json(rows) : res.status(204).json([]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = { listCategories };
