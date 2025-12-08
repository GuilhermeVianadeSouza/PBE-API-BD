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
const controllerFilme               =           require('./controller/filme/controller_filme.js')
const controllerIdioma              =           require('./controller/idioma/controller_idioma.js')
const controllerPais                =           require('./controller/pais/controller_pais.js')
const controllerGenero              =           require('./controller/genero/controller_genero..js')
const controllerPersonagem          =           require('./controller/personagem/controller_personagem.js')
const controllerAtor                =           require('./controller/ator/controller_ator.js')

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

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response){
    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

app.get('/v1/locadora/idioma', cors(), async function (request, response){
    let idioma = await controllerIdioma.listarIdiomas()

    response.status(idioma.status_code)
    response.json(idioma)
})

app.get('/v1/locadora/idioma/:id', cors(), async function (request, response){
    let idIdioma = request.params.id

    let idioma = await controllerIdioma.listarIdiomaPorID(idIdioma)
    response.status(idioma.status_code)
    response.json(idioma)
})

app.post('/v1/locadora/idioma', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    
    let contentType = request.headers['content-type']

    let idioma = await controllerIdioma.criarIdioma(dadosBody, contentType)
    console.log(idioma)
    response.status(idioma.status_code)
    response.json(idioma)
})

app.put('/v1/locadora/idioma/:id', cors(), bodyParserJSON, async function (request, response){
    let idIdioma = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let idioma = await controllerIdioma.atualizarIdioma(dadosBody, contentType, idIdioma)
    response.status(idioma.status_code)
    response.json(idioma)
})

app.delete('/v1/locadora/idioma/:id', cors(), async function(request, response){
    let idIdioma = request.params.id

    let idioma = await controllerIdioma.deletarIdioma(idIdioma)
    response.status(idioma.status_code)
    response.json(idioma)
})

app.get('/v1/locadora/pais', cors(), async function (request, response){
    let pais = await controllerPais.listarTodosOsPaises()
    response.status(pais.status_code)
    response.json(pais)
})

app.get('/v1/locadora/pais/:id', cors(), async function (request, response){
    let idPais = request.params.id

    let pais = await controllerPais.listarPaisporID(idPais)
    response.status(pais.status_code)
    response.json(pais)
})

app.post('/v1/locadora/pais', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let pais = await controllerPais.criarPais(dadosBody, contentType)
    response.status(pais.status_code)
    response.json(pais)

})

app.put('/v1/locadora/pais/:id', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let idPais = request.params.id

    let pais = await controllerPais.atualizarPais(dadosBody, contentType, idPais)
    response.status(pais.status_code)
    response.json(pais)
})

app.delete('/v1/locadora/pais/:id', cors(), async function(request, response){
    let idPais = request.params.id

    let pais = await controllerPais.deletarPais(idPais)
    response.status(pais.status_code)
    response.json(pais)
})

app.get('/v1/locadora/genero', cors(), async function (request, response){
    let genero = await controllerGenero.listarTodosOsGeneros()
    response.status(genero.status_code)
    response.json(genero)
})

app.get('/v1/locadora/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id

    let genero = await controllerGenero.listarGeneroPorID(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

app.post('/v1/locadora/genero/', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    
    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserindoGenero(dadosBody, contentType)
    response.status(genero.status_code)
    response.json(genero)
})

app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let idGenero = request.params.id

    let genero = await controllerGenero.atualizarGenero(dadosBody, contentType, idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

app.delete('/v1/locadora/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id

    let genero = await controllerGenero.deletarGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

app.get('/v1/locadora/personagem', cors(), async function(request, response){
    let personagem = await controllerPersonagem.listarTodosOsPersonagem()
    response.status(personagem.status_code)
    response.json(personagem)
})

app.get('/v1/locadora/personagem/:id', cors(), async function(request, response){
    let idPersonagem = request.params.id
    let personagem = await controllerPersonagem.listarPersonagemPorId(idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
})

app.post('/v1/locadora/personagem/', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    
    let contentType = request.headers['content-type']

    let personagem = await controllerPersonagem.criarPersonagem(dadosBody, contentType)
    response.status(personagem.status_code)
    response.json(personagem)
})

app.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, contentType, idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
})

app.delete('/v1/locadora/personagem/:id', cors(), async function(request, response){
    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.deletarPersonagem(idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
})

app.get('/v1/locadora/ator', cors(), async function(request, response){
    let ator = await controllerAtor.listarTodosOsAtores()
    response.status(ator.status_code)
    response.json(ator)
})

app.get('/v1/locadora/ator/:id', cors(), async function(request, response){
    let idAtor = request.params.id
    let ator = await controllerAtor.listarAtorPorId(idAtor)
    response.status(ator.status_code)
    response.json(ator)
})

app.post('/v1/locadora/ator/', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    
    let contentType = request.headers['content-type']

    let ator = await controllerAtor.criarAtor(dadosBody, contentType)
    response.status(ator.status_code)
    response.json(ator)
})

app.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let idAtor = request.params.id

    let ator = await controllerAtor.atualizarAtor(dadosBody, contentType, idAtor)
    response.status(ator.status_code)
    response.json(ator)
})

app.delete('/v1/locadora/ator/:id', cors(), async function(request, response){
    let idAtor = request.params.id

    let ator = await controllerAtor.deletarAtor(idAtor)
    response.status(ator.status_code)
    response.json(ator)
})

app.listen(PORT, function(){
    console.log("API aguardando request !!!")
})