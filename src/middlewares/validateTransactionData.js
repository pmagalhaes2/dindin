const validateTransactionDataFields = (req, res, next) => {
  const bodyData = req.body;
  const mandatoryFields = [
    "descricao",
    "valor",
    "data",
    "categoria_id",
    "tipo",
  ];

  if (!Object.keys(bodyData).length) {
    return res.status(400).json({
      message: "Todos os campos obrigatórios devem ser informados.",
    });
  }

  if (bodyData["tipo"] !== "entrada" && bodyData["tipo"] !== "saida") {
    return res.status(400).json({
      message: "O campo tipo deve corresponder a 'entrada' ou 'saida'.",
    });
  }

  for (const field of mandatoryFields) {
    if (!bodyData[field]) {
      return res.status(400).json({
        message: `O campo ${field} é obrigatório!`,
      });
    }
  }

  next();
};

module.exports = { validateTransactionDataFields };
