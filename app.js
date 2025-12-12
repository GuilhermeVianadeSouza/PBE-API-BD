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
const filmeRoutes      = require('./routers/filmeRoutes.js')
const atorRoutes       = require('./routers/atorRoutes.js')
const idiomaRoutes     = require('./routers/idiomaRoutes.js')
const paisRoutes       = require('./routers/paisRoutes.js')
const generoRoutes     = require('./routers/generoRoutes.js')
const personagemRoutes = require('./routers/personagemRoutes.js')
const diretorRoutes    = require('./routers/diretorRoutes.js')
const dubladorRoutes   = require('./routers/dubladorRoutes.js')
const estudioRoutes    = require('./routers/estudioRoutes.js')
const produtoraRoutes  = require('./routers/produtoraRoutes.js')
const roteristaRoutes  = require('./routers/roteristaRoutes.js')

//EndPoinst para a rota de Filme
app.use('/v1/locadora/filme', filmeRoutes)
app.use('/v1/locadora/ator', atorRoutes)
app.use('/v1/locadora/diretor', diretorRoutes)
app.use('/v1/locadora/dublador', dubladorRoutes)
app.use('/v1/locadora/estudio', estudioRoutes)
app.use('/v1/locadora/genero', generoRoutes)
app.use('/v1/locadora/idioma', idiomaRoutes)
app.use('/v1/locadora/pais', paisRoutes)
app.use('/v1/locadora/personagem', personagemRoutes)
app.use('/v1/locadora/produtora', produtoraRoutes)
app.use('/v1/locadora/roterista', roteristaRoutes)


app.listen(PORT, function(){
    console.log("API aguardando request !!!")
})