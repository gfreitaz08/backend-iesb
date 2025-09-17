// import o express
const express = require('express')

// crio uma instância(express) da minha aplicação 

const app = express()


 app.get('/hello', (req,res,next) =>{
    res.send("Hello World")
 })

 app.get('/pessoas', (req, res,next) => {
        const pessoas = [
            {
            id: 1,
            nome: "mateus"
            },

            {
                id: 2,
                nome: "ana"
            }
        ] 
} )

app.listen(3000, () => {   console.log("Minha aplicaçâo está rodando em http://localhost:3000")
})