const pool = require("../connection");

const listTransaction = async (req, res) => {
  const { id } = req.usuario;

  try {
    const { rows } = await pool.query(
      `SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id,
       c.id as categoria_id, c.descricao as categoria_nome FROM transacoes t 
       JOIN categorias c ON t.categoria_id = c.id 
       WHERE t.usuario_id = $1`,
      [id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.usuario;
  const { id: transactionId } = req.params;

  try {
    const { rowCount, rows } = await pool.query(
      ` SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id,
        c.id as categoria_id, c.descricao as categoria_nome FROM transacoes t 
        JOIN categorias c ON t.categoria_id = c.id 
        WHERE t.id = $1 AND t.usuario_id = $2`,
      [transactionId, id]
    );

    return rowCount > 0
      ? res.json(rows)
      : res.status(404).json({ message: "Transação não encontrada!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};



module.exports = {
  listTransaction,
  getTransactionById,
};
