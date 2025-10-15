/***********************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelas requisições da API da locadora de filmes
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 **********************************************************************************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON    =   bodyParser.json()

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

//Retorna a lista de todos os Filmes
app.get('/v1/locadora/filme', cors(), async function(request, response){
    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

//retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function(request, response){
    //Recebe o ID encaminhado via parametro na requisição
    let id = request.params.id

    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmesId(id)
    response.status(filme.status_code)
    response.json(filme)
})

//Insere um novo filme
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
    
    //recebendo os dados via body da requisição (Se utilizando-se o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    //chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)
    response.status(filme.status_code)
    response.json(filme)
})

//Atualizar um filme existente.
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o ID do filme.
    let idFilme = request.params.id
    //Recebe os dados que serão atualizados
    let dadosBody = request.body
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)
    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function(){
    console.log("API aguardando request !!!")
})