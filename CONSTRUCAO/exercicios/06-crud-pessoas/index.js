const express = require('express')
const app = express()
 
// configurar e mapear os instrumentos

const cors = require('cors')

app.use(cors())  // habilitar o CORS do browser

app.use(express.json()) // receber JSON no body da requisição 

//mapear os meus routes 
const pessoasRouter = require('./routes/Pessoas')
app.use(pessoasRouter)
//executar a aplicação 

app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
})