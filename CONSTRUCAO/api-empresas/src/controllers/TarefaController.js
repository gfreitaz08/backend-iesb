const TarefaModel = require("../models/TarefaModel");

module.exports = {
  async create(req, res) {
    try {
      const tarefa = await TarefaModel.create(req.body);
      return res.status(201).json(tarefa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    const tarefas = await TarefaModel.find().populate([
      "funcionario",
      "projeto",
    ]);
    return res.status(200).json(tarefas);
  },

  async findById(req, res) {
    const tarefa = await TarefaModel.findById(req.params.id).populate([
      "funcionario",
      "projeto",
    ]);
    if (!tarefa)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    return res.status(200).json(tarefa);
  },

  async update(req, res) {
    try {
      const tarefa = await TarefaModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!tarefa)
        return res.status(404).json({ error: "Tarefa não encontrada" });
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const tarefa = await TarefaModel.findByIdAndDelete(req.params.id);
    if (!tarefa)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    return res.status(204).send();
  },
};