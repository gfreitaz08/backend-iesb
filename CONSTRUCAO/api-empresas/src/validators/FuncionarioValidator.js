const yup = require("yup");
const mongoose = require("mongoose");

function objectIdTest(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

const enderecoShape = yup.object().shape({
  cep: yup.string(),
  logradouro: yup.string(),
  numero: yup.string(),
  complemento: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  uf: yup.string(),
});

const createSchema = yup.object().shape({
  nome: yup.string().required(),
  cpf: yup.string().required(),
  email: yup.string().required().email(),
  telefone: yup.string().required(),
  data_contratacao: yup.date().required(),
  data_nascimento: yup.date().required(),
  genero: yup.string().required(),
  endereco: enderecoShape.notRequired(),
  cargo: yup
    .string()
    .required()
    .test("is-objectid", "cargo inválido", objectIdTest),
  departamento: yup
    .string()
    .required()
    .test("is-objectid", "departamento inválido", objectIdTest),
});

const updateSchema = yup.object().shape({
  nome: yup.string(),
  cpf: yup.string(),
  email: yup.string().email(),
  telefone: yup.string(),
  data_contratacao: yup.date(),
  data_nascimento: yup.date(),
  genero: yup.string(),
  endereco: enderecoShape.notRequired(),
  cargo: yup
    .string()
    .test(
      "is-objectid",
      "cargo inválido",
      (value) => !value || objectIdTest(value)
    ),
  departamento: yup
    .string()
    .test(
      "is-objectid",
      "departamento inválido",
      (value) => !value || objectIdTest(value)
    ),
});

function validator(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }
  };
}

module.exports = {
  create: validator(createSchema),
  update: validator(updateSchema),
};