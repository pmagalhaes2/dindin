const joi = require("joi");

const schemaUserDataFields = joi.object({
  nome: joi.string().required().messages({
    "string.empty": "O campo nome não pode ser vazio!",
    "any.required": "O campo nome é obrigatório!",
  }),
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

module.exports = schemaUserDataFields;
