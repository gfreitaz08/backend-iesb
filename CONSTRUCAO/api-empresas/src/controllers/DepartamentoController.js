const DepartamentoModel = require("../models/DepartamentoModel");

module.exports = {
  async create(req, res) {
    try {
      const departamento = await DepartamentoModel.create(req.body);
      return res.status(201).json(departamento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    const departamentos = await DepartamentoModel.find();
    return res.status(200).json(departamentos);
  },

  async findById(req, res) {
    const departamento = await DepartamentoModel.findById(req.params.id);
    if (!departamento)
      return res.status(404).json({ error: "Departamento não encontrado" });
    return res.status(200).json(departamento);
  },

  async update(req, res) {
    try {
      const departamento = await DepartamentoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!departamento)
        return res.status(404).json({ error: "Departamento não encontrado" });
      return res.status(200).json(departamento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const departamento = await DepartamentoModel.findByIdAndDelete(
      req.params.id
    );
    if (!departamento)
      return res.status(404).json({ error: "Departamento não encontrado" });
    return res.status(204).send();
  },
};