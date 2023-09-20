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

const registerTransaction = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const { id } = req.usuario;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res
      .status(400)
      .json({ message: "Todos os campos obrigatórios devem ser informados." });
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    return res
      .status(400)
      .json({ mensagem: "O tipo deve ser entrada ou saida." });
  }

  try {
    const { rowCount } = await pool.query(
      "SELECT * FROM categorias WHERE id = $1",
      [categoria_id]
    );

    if (rowCount === 0) {
      return res.status(400).json({ mensagem: "Categoria não encontrada." });
    }

    const newTransaction = await pool.query(
      "INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) returning *",
      [descricao, valor, data, categoria_id, tipo, id]
    );

    const { rows } = await pool.query(
      `SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id,
        c.id as categoria_id, c.descricao as categoria_nome FROM transacoes t 
        JOIN categorias c ON t.categoria_id = c.id 
        WHERE t.id = $1 AND t.usuario_id = $2`,
      [newTransaction.rows[0].id, id]
    );

    return res.status(201).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.usuario;
  const { id: transactionId } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const validTransaction = await pool.query(
      "SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2",
      [transactionId, id]
    );

    const validCategory = await pool.query(
      "SELECT * FROM categorias WHERE id = $1",
      [categoria_id]
    );

    if (validTransaction.rowCount === 0) {
      return res.status(400).json({ message: "Transação não encontrada!" });
    }

    if (validCategory.rowCount === 0) {
      return res.status(400).json({ message: "Campo categoria_id inválido!" });
    }

    await pool.query(
      `UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 
      WHERE id = $6 AND usuario_id = $7`,
      [descricao, valor, data, categoria_id, tipo, transactionId, id]
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = {
  listTransaction,
  getTransactionById,
  registerTransaction,
  updateTransaction,
};
