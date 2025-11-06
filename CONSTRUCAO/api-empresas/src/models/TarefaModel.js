const mongoose = require("mongoose");

const TarefaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    data_inicio: { type: Date, required: true },
    data_fim: { type: Date, required: true },
    responsavel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Funcionario",
      required: true,
    },
    projeto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projeto",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tarefa", TarefaSchema);