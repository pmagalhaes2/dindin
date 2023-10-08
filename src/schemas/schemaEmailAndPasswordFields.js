const joi = require("joi");

const schemaEmailAndPasswordFiels = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "O campo email não pode ser vazio!",
    "any.required": "O campo email é obrigatório!",
    "string.email": "Formato do email é inválido!",
  }),
  senha: joi.string().required().messages({
    "string.empty": "O campo senha não pode ser vazio!",
    "any.required": "O campo senha é obrigatório!",
  }),
});

module.exports = schemaEmailAndPasswordFiels;
