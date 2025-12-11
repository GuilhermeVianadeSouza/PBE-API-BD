/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de filme;
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0 (CRUD básico do filme, sem as relações com outras tabelas)
 * Versão: 1.1 (CRUD do filme com relacionamento com a tabela genero)
 * Versão: 1.2 (CRUD do filme com relacionamento com a tabela diretor)
 ******************************************************************************************************************************/

//Import da model do DAO do filme;
const filmeDAO = require('../../model/DAO/filme.js')

//Import da controller de relação entre Filme e Genero
const controllerFilmeGenero = require('./controller_filme_genero.js')
const controllerFilmeDiretor = require('./controller_filme_diretor.js')
const controllerFilmeEstudio = require('./controller_filme_estudio.js')
const controllerFilmeProdutora = require('./controller_filme_produtora.js')
const controllerFilmeRoterista = require('./controller_filme_roterista.js')

//Import do arquivo de mensagens padronizadas
const DEFAULT_MESSAGES = require('../modulo/config_message.js')


//retorna uma lista de todos os filmes
const listarFilmes = async function(){
let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try{//Criando um objeto novo para as mensagens
        //Chama a função do DAO para retorna a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()
        if (resultFilmes){
            if (resultFilmes.length > 0) {

                //Processamento para adicionar os generos aos filmes
                for(let filme of resultFilmes){
                    let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id_filme)

                    if(resultGeneros.status_code == 200)

                    filme.generos = resultGeneros.items.filmes_generos

                    let resultDiretores = await controllerFilmeDiretor.listarDiretorIdFilme(filme.id_filme)
                    if(resultDiretores.status_code == 200) {
                    filme.diretores = resultDiretores.items.filme_diretor
                }
            }

                MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes
    
                return MESSAGES.DEFAULT_HEADER //200
            } else{
                return MESSAGES.ERROR_NOT_FOUND //404
            } 
        } else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna um filme filtrando pelo ID
const buscarFilmesId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if(resultFilmes){
                if(resultFilmes.length > 0){
                    for(filme of resultFilmes){
                        let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id_filme)
    
                        if(resultGeneros.status_code == 200)
    
                        filme.genero = resultGeneros.items.filmes_generos

                        let resultDiretores = await controllerFilmeDiretor.listarDiretorIdFilme(filme.id_filme)
                        if(resultDiretores.status_code == 200) {
                        filme.diretores = resultDiretores.items.filme_diretor
                    }
                }

                    MESSAGES.DEFAULT_HEADER.status  = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER //200
                } else{
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL// 500
            }
        } else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um filme
const inserirFilme = async function(filme, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório JSON)
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            
            //Chama a função de validar todos os dados do filme.
            let validar = await validarDadosFilme(filme)
            
            if(!validar){
                //Processamento da verdadeira.
                //Chama a função para inserir um novo filme no Banco de Dados.
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes){
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await filmeDAO.getSelectLastID()
                
                    if(lastID){

                        //Processar a inserção dos dados na tabela de relação.
                        //entre Filme e Genero
                        //for of - async functions 
                        for(genero of filme.genero){
                        // filme.genero.forEach(async function (genero){
                            //Cria o JSON com o ID do filme e o ID do genero
                            let filmeGenero = {id_filme: lastID, id_genero: genero.id}
                            //fazemos isso para encaminhar os dois id para a controller respectiva

                            //Encaminha o JSON com o ID do filme e do genero para a CONTROLLER FilmeGenero
                            let resultFilmesGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                            if(resultFilmesGenero.status_code != 201)
                                return MESSAGES.ERROR_RELATIONAL_INSERTION //500 PROBLEMA NA TABELA DE RELAÇÃO
                        }
                    if (filme.diretores && filme.diretores.length > 0) {
                            for (let diretor of filme.diretores) {
                                let filmeDiretor = { id_filme: lastID, tipo_direcao: diretor.tipo_direcao, id_diretor: diretor.id }
                                // Chama a controller que insere na tabela intermediária filme_diretor
                                let resultFilmesDiretor = await controllerFilmeDiretor.inserirFilmeDiretor(filmeDiretor, contentType)
                                if (resultFilmesDiretor.status_code != 201)
                                    return MESSAGES.ERROR_RELATIONAL_INSERTION 
                            }
                        }

                    //Adiciona o id no JSON com os dados do filme
                        filme.id = lastID
                        MESSAGES.DEFAULT_HEADER.status          =        MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =        MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         =        MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items           =        filme 

                        //Adicionar no JSON dados do GENERO.
                        //apaga o atributo genero apenas com os ids que foram enviados no post
                        delete filme.genero

                        //Pesquisa no BD todos os gêneros que foram associados ao filme
                        let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(lastID)
                        //Recria o atributo genero com os dados que foram entregue no BD com os generos
                        filme.genero = resultDadosGeneros.items.filmes_generos
                        //Apagando o genero que vem apenas com o id na requisição, é realizado uma busca pelo id do filme trazendo todos os generos, e assim recriando o genero novamente que retornara id e o nome que foram guardado na let.
                        let resultDadosDiretores = await controllerFilmeDiretor.listarDiretorIdFilme(lastID)
                        if(resultDadosDiretores.status_code == 200) filme.diretores = resultDadosDiretores.items.filme_diretor
                        
                        return MESSAGES.DEFAULT_HEADER //201
                    } else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500 MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
 
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500        
    } 
}

//Atualiza um filme filtrando pelo ID
const atualizarFilme = async function(filme, id, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório JSON)
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){

                //Chama a função de validar todos os dados do filme.
                let validar = await validarDadosFilme(filme)
                if(!validar){
                    //Validação de ID válido. Chama à função da controller que verifica no BD se o ID existe e valida o ID
                    let validarID = await buscarFilmesId(id)
                    if(validarID.status_code == 200){

                        //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                        filme.id = Number(id)
                        let deletarRelacaoFilmeGenero = await controllerFilmeGenero.excluirFilmeGeneroPorIdFilme(filme.id)
                        if(deletarRelacaoFilmeGenero.status_code != 200){
                            return deletarRelacaoFilmeGenero
                        }
                        for(genero of filme.genero){
                                let filmeGenero = {id_filme: filme.id, id_genero: genero.id}
                                let resultFilmesGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                                if(resultFilmesGenero.status_code != 201)
                                    return MESSAGES.ERROR_RELATIONAL_INSERTION //500 PROBLEMA NA TABELA DE RELAÇÃO
                            }
                        let deletarRelacaoFilmeDiretor = await controllerFilmeDiretor.excluirFilmeDiretorPorIdFilme(filme.id)
                        if(deletarRelacaoFilmeDiretor.status_code != 200){
                            return deletarRelacaoFilmeDiretor
                        }
                        for(diretor of filme.diretores){
                            let filmeDiretor = {id_filme: filme.id, tipo_direcao: diretor.tipo_direcao, id_diretor: diretor.id }
                            let resultFilmesDiretor = await controllerFilmeDiretor.inserirFilmeDiretor(filmeDiretor, contentType)
                            if(resultFilmesDiretor.status_code !=201)
                                return MESSAGES.ERROR_RELATIONAL_INSERTION
                        }
                        
                        
                        //Processamento da verdadeira.
                        //Chama a função para Atualizar um novo filme no Banco de Dados.
                        let resultFilmes = await filmeDAO.setUpdateMovies(filme)
                        if (resultFilmes){
                            MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message         =       MESSAGES.SUCESS_UPDATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.filme     =       filme

                            return MESSAGES.DEFAULT_HEADER //200
                        } else {
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else{
                        return validarID //A função buscarFilmeID poderá retornar(400 ou 404 ou 500)
                    }
                } else {
                    return validar //400 referente a validação dos dados.
                }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500        
    } 
}

//Exclui um filme filtrando pelo ID
const excluirFilme = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
                    //Validação de ID válido. Chama à função da controller que verifica no BD se o ID existe e valida o ID
                    let validarID = await buscarFilmesId(id)
                    if(validarID.status_code == 200){
                        //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                        id = Number(id)

                        let deletarRelacaoFilmeGenero = await controllerFilmeGenero.excluirFilmeGeneroPorIdFilme(id)
                        if(deletarRelacaoFilmeGenero.status_code != 200 && deletarRelacaoFilmeGenero.status_code != 404 ){
                            return deletarRelacaoFilmeGenero
                        }

                        let deletarRelacaoFilmeDiretor = await controllerFilmeDiretor.excluirFilmeDiretorPorIdFilme(id)
                        if(deletarRelacaoFilmeDiretor.status_code != 200 && deletarRelacaoFilmeDiretor.status_code != 404)
                            return deletarRelacaoFilmeDiretor


                        let resultFilmes = await filmeDAO.setDeleteMovies(id)

                        if (resultFilmes){
                            MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_DELETED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_DELETED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message         =       MESSAGES.SUCESS_DELETED_ITEM.message

                            return MESSAGES.DEFAULT_HEADER //200
                        } else {
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500 model
                        }
                    } else{
                        return validarID //A função buscarFilmeID poderá retornar(400 ou 404 ou 500)
                    }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller      
    } 
}
//validação dos dados de cadastro e atualização do filme. Função privada, apenas dessa controller
const validarDadosFilme = async function (filme) {
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas as entradas de dados
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data lançamento Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == undefined || filme.duracao == null || filme.duracao == '' || filme.duracao.length > 8){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == undefined || filme.orcamento == null || filme.orcamento == '' || filme.orcamento.length > 12 || typeof(filme.orcamento) != 'number'){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailler == undefined || filme.trailler.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == undefined || filme.capa == null || filme.capa == '' || filme.capa.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false //não teve erros
    }
}

module.exports = {
    listarFilmes,
    buscarFilmesId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}