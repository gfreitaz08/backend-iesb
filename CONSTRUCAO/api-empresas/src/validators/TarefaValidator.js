const yup = require("yup");
const mongoose = require("mongoose");

function isObjectId(val) {
  return mongoose.Types.ObjectId.isValid(val);
}

const createSchema = yup.object().shape({
  titulo: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup
    .date()
    .required()
    .min(yup.ref("data_inicio"), "data_fim deve ser posterior a data_inicio"),
  responsavel: yup
    .string()
    .required()
    .test("is-objectid", "responsavel inválido", isObjectId),
  projeto: yup
    .string()
    .required()
    .test("is-objectid", "projeto inválido", isObjectId),
});

const updateSchema = yup.object().shape({
  titulo: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup
    .date()
    .when("data_inicio", (data_inicio, schema) =>
      data_inicio
        ? schema.min(data_inicio, "data_fim deve ser posterior a data_inicio")
        : schema
    ),
  responsavel: yup
    .string()
    .test(
      "is-objectid",
      "responsavel inválido",
      (value) => !value || isObjectId(value)
    ),
  projeto: yup
    .string()
    .test(
      "is-objectid",
      "projeto inválido",
      (value) => !value || isObjectId(value)
    ),
});

// middleware genérico para usar nos controllers
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