const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')


const controllerRoterista = require('../controller/roterista/controller_roterista.js')


const bodyParserJSON = bodyParser.json()

router.get('/', cors(), async function(request, response){
    let dados = await controllerRoterista.listarTodosOsRoterista()
    response.status(dados.status_code)
    response.json(dados)
})

// Buscar por ID
router.get('/:id', cors(), async function(request, response){
    let id = request.params.id
    let dados = await controllerRoterista.listarRoteristaPorId(id)
    response.status(dados.status_code)
    response.json(dados)
})

// Inserir
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let dados = await controllerRoterista.criarRoterista(dadosBody, contentType)
    response.status(dados.status_code)
    response.json(dados)
})

// Atualizar
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body
    let dados = await controllerRoterista.atualizarRoterista(dadosBody, contentType, id)
    response.status(dados.status_code)
    response.json(dados)
})

// Deletar
router.delete('/:id', cors(), async function (request, response){
    let id = request.params.id
    let dados = await controllerRoterista.deletarRoterista(id)
    response.status(dados.status_code)
    response.json(dados)
})

module.exports = router