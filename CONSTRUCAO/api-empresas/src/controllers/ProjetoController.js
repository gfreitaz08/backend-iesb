const ProjetoModel = require("../models/ProjetoModel");

module.exports = {
  async create(req, res) {
    try {
      const projeto = await ProjetoModel.create(req.body);
      return res.status(201).json(projeto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    const projetos = await ProjetoModel.find();
    return res.status(200).json(projetos);
  },

  async findById(req, res) {
    const projeto = await ProjetoModel.findById(req.params.id);
    if (!projeto)
      return res.status(404).json({ error: "Projeto não encontrado" });
    return res.status(200).json(projeto);
  },

  async update(req, res) {
    try {
      const projeto = await ProjetoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!projeto)
        return res.status(404).json({ error: "Projeto não encontrado" });
      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const projeto = await ProjetoModel.findByIdAndDelete(req.params.id);
    if (!projeto)
      return res.status(404).json({ error: "Projeto não encontrado" });
    return res.status(204).send();
  },
};