const pool = require("../connection");

const listCategories = async (req, res) => {
  try {
    const { rowCount, rows } = await pool.query("SELECT * FROM categorias");

    return rowCount > 0 ? res.status(200).json(rows) : res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = { listCategories };
