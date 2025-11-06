const CargoModel = require("../models/CargoModel");

module.exports = {
  async create(req, res) {
    try {
      const cargo = await CargoModel.create(req.body);
      return res.status(201).json(cargo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    const cargos = await CargoModel.find();
    return res.status(200).json(cargos);
  },

  async findById(req, res) {
    const cargo = await CargoModel.findById(req.params.id);
    if (!cargo) return res.status(404).json({ error: "Cargo não encontrado" });
    return res.status(200).json(cargo);
  },

  async update(req, res) {
    try {
      const cargo = await CargoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!cargo)
        return res.status(404).json({ error: "Cargo não encontrado" });
      return res.status(200).json(cargo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const cargo = await CargoModel.findByIdAndDelete(req.params.id);
    if (!cargo) return res.status(404).json({ error: "Cargo não encontrado" });
    return res.status(204).send();
  },
};