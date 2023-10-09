const pool = require("../connection");

const listTransaction = async (req, res) => {
  const { id } = req.usuario;
  const { filtro } = req.query;

  try {
    if (!filtro) {
      const { rows } = await pool.query(
        `SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id,
          c.id as categoria_id, c.descricao as categoria_nome FROM transacoes t 
          JOIN categorias c ON t.categoria_id = c.id 
          WHERE t.usuario_id = $1`,
        [id]
      );
      return res.status(200).json(rows);
    }

    const { rows } = await pool.query(
      ` SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id,
          c.id as categoria_id, c.descricao as categoria_nome FROM transacoes t 
          JOIN categorias c ON t.categoria_id = c.id 
          WHERE t.usuario_id = $1 AND c.descricao ILIKE ANY ($2)`,
      [id, filtro]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
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
      ? res.status(200).json(rows)
      : res.status(404).json({ message: "Transação não encontrada!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

const registerTransaction = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const { id } = req.usuario;

  try {
    const categoryValidation = await validateCategory(categoria_id);

    if (!categoryValidation.isValid) {
      return res.status(404).json({ message: categoryValidation.message });
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
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.usuario;
  const { id: transactionId } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const transactionValidation = await validateTransaction(transactionId, id);

    if (!transactionValidation.isValid) {
      return res.status(404).json({ message: transactionValidation.message });
    }

    const categoryValidation = await validateCategory(categoria_id);

    if (!categoryValidation.isValid) {
      return res.status(404).json({ message: categoryValidation.message });
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

const deleteTransaction = async (req, res) => {
  const { id } = req.usuario;
  const { id: transactionId } = req.params;

  try {
    const transactionValidation = await validateTransaction(transactionId, id);

    if (!transactionValidation.isValid) {
      return res.status(404).json({ message: transactionValidation.message });
    }

    await pool.query(
      `DELETE FROM transacoes WHERE id = $1 AND usuario_id = $2`,
      [transactionId, id]
    );

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const listTransactionStatment = async (req, res) => {
  const { id } = req.usuario;

  try {
    const { rows } = await pool.query(
      `
    SELECT SUM(valor), tipo
    FROM transacoes
    WHERE usuario_id = $1 GROUP BY tipo
`,
      [id]
    );

    const sumEntries = rows.find((row) => row.tipo === "entrada")?.sum || 0;
    const sumOutput = rows.find((row) => row.tipo === "saida")?.sum || 0;

    return res
      .status(200)
      .json({ entrada: Number(sumEntries), saida: Number(sumOutput) });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao obter o extrato." });
  }
};

const validateTransaction = async (transactionId, userId) => {
  const { rowCount } = await pool.query(
    "SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2",
    [transactionId, userId]
  );

  if (rowCount === 0) {
    return { isValid: false, message: "Transação não encontrada!" };
  } else {
    return { isValid: true };
  }
};

const validateCategory = async (categoryId) => {
  const { rowCount } = await pool.query(
    "SELECT * FROM categorias WHERE id = $1",
    [categoryId]
  );

  if (rowCount === 0) {
    return { isValid: false, message: "Categoria não encontrada!" };
  } else {
    return { isValid: true };
  }
};

module.exports = {
  listTransaction,
  getTransactionById,
  registerTransaction,
  updateTransaction,
  deleteTransaction,
  listTransactionStatment,
};
