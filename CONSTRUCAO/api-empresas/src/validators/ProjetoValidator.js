const yup = require("yup");

const createSchema = yup.object().shape({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup
    .date()
    .required()
    .min(yup.ref("data_inicio"), "data_fim deve ser posterior a data_inicio"),
});

const updateSchema = yup.object().shape({
  nome: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().when("data_inicio", (data_inicio, schema) => {
    return data_inicio ? schema.min(data_inicio) : schema;
  }),
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