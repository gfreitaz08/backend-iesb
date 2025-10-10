const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const app = express()

app.use(express.json())

// connetar no bamco mongo

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
    console.log("conectado ao MongoDB")
    })
    .catch(err => {
        console.log("Erro ao conectar no banco MongoDB:  ", err)

    })
    app.listen(3000, () =>{
    console.log("Aplicação rodando em  https://localhost:3000")
})