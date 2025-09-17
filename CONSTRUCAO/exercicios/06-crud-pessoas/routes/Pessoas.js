const express = require('express')
const router = express.Router()

//mapear as rotas e a lógica

//Lista de pessoas pra simular o banco dados
let listaPessoas =[
    {
        id:1,
        nome:"joao",
        cpf:"00100100101",
        email:"João@pedro.com",
        DataNascimento:"01/01/2000",

        },
        {
            id:2,
            nome:"MAria",
            cpf:"00200200202",
            email:"Maria@joana.com",
            DataNascimento:"01/01/2008",

    
            }
]

// GET/ pessoas
router.get('/pessoas' , (req, res, next) =>{
    res.json(listaPessoas)

}
)

//exportar o roteador

module.exports = router
