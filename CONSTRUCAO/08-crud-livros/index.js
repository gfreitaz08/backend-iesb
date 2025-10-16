const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const app = express();

app.use(express.json());

// connetar no banco mongo

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("conectado ao MongoDB");
  })
  .catch((err) => {
    console.log("Erro ao conectar no banco MongoDB:  ", err);
  });

// Interface com banco de dados - Model
// Cada model representa uma Collection(Tabela)
const LivroModel = mongoose.model(
  "Livros", //título, autor, editora, ano e preço
  new mongoose.Schema({
    titulo: String,
    autor: String,
    editora: String,
    ano: String,
    preco: String,
  })
);

// CRUD
//Create
app.post("/livros", async (req, res, next) => {
  const livros = req.body;
  if (
    !livros.titulo &&
    !livros.autor &&
    !livros.editora &&
    !livros.ano &&
    !livros.preco
  ) {
    return res.status(400).json({ erro: "O campo nome é obrigatório" });
  }
  const livroCriado = await LivroModel.create(livros);
  res.status(201).json(livroCriado);
});

// READ
app.get("/livros", async (req, res, next) => {
  const livros = await LivroModel.find();
  res.json(livros);
});

// Start
app.listen(3000, () => {
  console.log("Aplicação rodando em  http://localhost:3000");
});