const joi = require("joi");

const schemaTransaction = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatório",
    "string.base": "O campo descrição deve ser um texto",
  }),
  valor: joi.number().required().messages({
    "any.required": "O campo valor é obrigatório",
    "number.base": "O campo valor deve ser um número",
  }),
  data: joi.date().required().messages({
    "any.required": "O campo data é obrigatório",
    "date.base": "O campo data deve conter uma data válida",
  }),
  categoria_id: joi.number().required().messages({
    "any.required": "O campo categoria é obrigatório",
    "number.base": "O campo categoria deve ser um número",
  }),
  tipo: joi.string().valid("entrada", "saida").required().messages({
    "any.required": "O campo tipo é obrigatório",
    "string.base": "O campo tipo deve ser um texto",
    "any.only": `O campo tipo deve corresponder a 'entrada' ou 'saida'`,
  }),
});

module.exports = schemaTransaction;
