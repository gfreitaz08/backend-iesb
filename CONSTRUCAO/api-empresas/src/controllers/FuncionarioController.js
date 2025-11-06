const FuncionarioModel = require("../models/FuncionarioModel");

module.exports = {
  async create(req, res) {
    try {
      const funcionario = await FuncionarioModel.create(req.body);
      return res.status(201).json(funcionario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    const funcionarios = await FuncionarioModel.find().populate([
      "cargo",
      "departamento",
    ]);
    return res.status(200).json(funcionarios);
  },

  async findById(req, res) {
    const funcionario = await FuncionarioModel.findById(req.params.id).populate(
      ["cargo", "departamento"]
    );
    if (!funcionario)
      return res.status(404).json({ error: "Funcionário não encontrado" });
    return res.status(200).json(funcionario);
  },

  async update(req, res) {
    try {
      const funcionario = await FuncionarioModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!funcionario)
        return res.status(404).json({ error: "Funcionário não encontrado" });
      return res.status(200).json(funcionario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const funcionario = await FuncionarioModel.findByIdAndDelete(req.params.id);
    if (!funcionario)
      return res.status(404).json({ error: "Funcionário não encontrado" });
    return res.status(204).send();
  },
};