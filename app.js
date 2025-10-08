/***********************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelas requisições da API da locadora de filmes
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 **********************************************************************************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//porta
const PORT = process.PORT || 8080
//
const app = express()
//configuração cors
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')

//EndPoinst para a rota de Filme
app.get('/v1/locadora/filmes', cors(), async function(request, response){
    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

app.get('/v1/locadora/filme/:id', cors(), async function(request, response){
    //Recebe o ID encaminhado via parametro na requisição
    let id = request.params.id

    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmesId(id)
    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function(){
    console.log("API aguardando request !!!")
})