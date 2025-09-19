const express = require("express");
const router = express.Router();

// lista de pessoas de simular o banco de dados
let listaPessoas = [
  {
    id: 1,
    nome: "Joao",
    cpf: "000000000-00",
    email: "joaofrango@gmail.com",
    dataNascimento: "01/01/2000",
  },
  {
    id: 2,
    nome: "Leal",
    cpf: "000000000-02",
    email: "cadu@gmail.com",
    dataNascimento: "02/02/2002",
  },
];

// mapear as rotas e a lógica
// Busca - GET /pessoas
router.get("/pessoas", (req, res, next) => {
  res.json(listaPessoas);
});

// Busca por ID -
// GET /pessoas/:id
router.get("/pessoas/:id", (req, res, next) => {
  // recebendo o ID como parametro dinâmico
  const id = req.params.id;
  // faço a busca na lista de pessoas pelo id recebido
  const pessoa = listaPessoas.find((pessoa) => pessoa.id == id);
  if (!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada!!!" });
  }
  res.json(pessoa);
});

// Criação - POST /pessoas
router.post("/pessoas", (req, res, next) => {
  const { nome, cpf, email, dataNascimento } = req.body;
  if (!nome || !cpf || !email || !dataNascimento) {
    return res
      .status(400)
      .json({ error: "Nome, cpf, email e dataNascimento são obrigatórios!!" });
  }
  // validar se o cpf já foi cadastrado
  if (listaPessoas.some((pessoa) => pessoa.cpf == cpf)) {
    return res.status(409).json({ error: "CPF já cadastrado !!!" });
  }

  const novaPessoa = {
    id: Date.now(), // irá dar um numero diferente a cada requisição
    nome,
    cpf,
    email,
    dataNascimento,
  };
  listaPessoas.push(novaPessoa);
  res
    .status(201)
    .json({ message: "Pessoa cadastrada com sucesso", novaPessoa });
});

//Atualização
// PUT ou PATCH /pessoas/:id
router.put("/pessoas/:id", (req, res, next) => {
  const id = req.params.id;
  const pessoa = listaPessoas.find((pessoa) => pessoa.id == id);

  //valido se a pessoa existe
  if (!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada!!!" });
  }

  // validando se os dados pra atualizar vinheram na requisição
  const { nome, email, dataNascimento } = req.body;
  if (!nome || !email || !dataNascimento) {
    return res
      .status(400)
      .json({ error: "nome, email, dataNascimento são obrigatórios" });
  }

  // atualizar os dados de pessoa
  pessoa.nome = nome;
  pessoa.email = email;
  pessoa.dataNascimento = dataNascimento;

  // Responde com os dados da pessoa atualizado
  res.json({ message: "Pessoa atualizada com sucesso!!!", pessoa });
});

// Remoção
// Delete /pessoas/:id
router.delete("/pessoas/:id", (req, res, next) => {
  const id = req.params.id;
  // validar se a pessoa nao existe
  const pessoa = listaPessoas.find((pessoa) => pessoa.id == id);
  if (!pessoa) {
    return res.status(404).json({ error: "pessoa nao encontrada!!" });
  }

  listaPessoas = listaPessoas.filter((pessoa) => pessoa.id != id);
  res.json({ message: "Pessoa excluida com sucesso!!!" }); 
});

// exportar o roteador
module.exports = router;