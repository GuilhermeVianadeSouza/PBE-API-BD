const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')


const controllerDublagem = require('../controller/dublagem/controller_dublagem.js')


const bodyParserJSON = bodyParser.json()

router.get('/', cors(), async function(request, response){
    let dados = await controllerDublagem.listarTodosAsDublagem()
    response.status(dados.status_code)
    response.json(dados)
})

// Buscar por ID
router.get('/:id', cors(), async function(request, response){
    let id = request.params.id
    let dados = await controllerDublagem.listarDublagemPorId(id)
    response.status(dados.status_code)
    response.json(dados)
})

// Inserir
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let dados = await controllerDublagem.criarDublagem(dadosBody, contentType)
    response.status(dados.status_code)
    response.json(dados)
})

// Atualizar
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body
    let dados = await controllerDublagem.atualizarDublagem(dadosBody, contentType, id)
    response.status(dados.status_code)
    response.json(dados)
})

// Deletar
router.delete('/:id', cors(), async function (request, response){
    let id = request.params.id
    let dados = await controllerDublagem.deletarDublagem(id)
    response.status(dados.status_code)
    response.json(dados)
})

module.exports = router