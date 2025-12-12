const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')


const controllerProdutora = require('../controller/produtora/controller_produtora.js')


const bodyParserJSON = bodyParser.json()

router.get('/', cors(), async function(request, response){
    let dados = await controllerProdutora.listarTodosAsProdutoras()
    response.status(dados.status_code)
    response.json(dados)
})

// Buscar por ID
router.get('/:id', cors(), async function(request, response){
    let id = request.params.id
    let dados = await controllerProdutora.listarProdutoraPorId(id)
    response.status(dados.status_code)
    response.json(dados)
})

// Inserir
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let dados = await controllerProdutora.criarProdutora(dadosBody, contentType)
    response.status(dados.status_code)
    response.json(dados)
})

// Atualizar
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body
    let dados = await controllerProdutora.atualizarProdutora(dadosBody, contentType, id)
    response.status(dados.status_code)
    response.json(dados)
})

// Deletar
router.delete('/:id', cors(), async function (request, response){
    let id = request.params.id
    let dados = await controllerProdutora.deletarProdutora(id)
    response.status(dados.status_code)
    response.json(dados)
})

module.exports = router