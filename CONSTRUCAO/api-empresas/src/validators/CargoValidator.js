const yup = require("yup");

const createSchema = yup.object().shape({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  salario: yup.number().required().min(1518),
});

const updateSchema = yup.object().shape({
  nome: yup.string(),
  descricao: yup.string(),
  salario: yup.number().min(1518),
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