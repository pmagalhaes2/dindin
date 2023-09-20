const pool = require("../connection");

const listTransaction = async (req, res) => {
    const { id } = req.usuario

    try {
        const { rows } = await pool.query("SELECT *, c.descricao as categoria_nome FROM transacoes t JOIN categorias c ON t.categoria_id = c.id WHERE t.usuario_id = $1;", [id]);

        return res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

module.exports = {
    listTransaction,
}
