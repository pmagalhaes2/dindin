const validateTransactionDataFields = (schema) => async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "Todos os campos obrigatórios devem ser informados.",
    });
  }
  try {
    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { validateTransactionDataFields };
