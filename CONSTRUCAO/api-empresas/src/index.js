require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const DepartamentoController = require("./controllers/DepartamentoController");
const CargoController = require("./controllers/CargoController");
const FuncionarioController = require("./controllers/FuncionarioController");
const ProjetoController = require("./controllers/ProjetoController");
const TarefaController = require("./controllers/TarefaController");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function start() {
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
  if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
    console.error("Variáveis de ambiente do banco não configuradas. Veja .env");
    process.exit(1);
  }

  const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log("Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB", err);
    process.exit(1);
  }

  // rotas
  app.use("/departamentos", DepartamentoController);
  app.use("/cargos", CargoController);
  app.use("/funcionarios", FuncionarioController);
  app.use("/projetos", ProjetoController);
  app.use("/tarefas", TarefaController);

  app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: "Erro interno" });
  });

  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

start();