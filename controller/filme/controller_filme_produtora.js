/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e produtora;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

//Import da model do DAO do filme Diretor
const filmeProdutoraDAO= require('../../model/DAO/filme_produtora.js')

//Import 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarFilmesProdutora = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultFilmeProducer = await filmeProdutoraDAO.getSelectAllMoviesProducer()
        if(resultFilmeProducer){
            if(resultFilmeProducer.length > 0){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_produtora       =       resultFilmeProducer

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarFilmeProdutoraId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id != null && id != '' &&  id != undefined && id > 0){
            let resultFilmeProducerID = await filmeProdutoraDAO.getSelectProducerMoviesByID(Number(id))
            if(resultFilmeProducerID){
                if(resultFilmeProducerID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_produtora =       resultFilmeProducerID
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//retorna diretores filtrando pelo ID do filme
const listarProdutoraIdFilme = async function(idFilme){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idFilme) && idFilme != null && idFilme != '' &&  idFilme != undefined && idFilme > 0){
            let resultFilmeProducerID = await filmeProdutoraDAO.getSelectProducerByIdMovies(Number(idFilme))
            if(resultFilmeProducerID){
                if(resultFilmeProducerID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_produtora =       resultFilmeProducerID
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//retorna generos filtrando pelo ID do filme
const listarFilmesIdProdutora = async function(idProdutora){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idProdutora) && idProdutora != null && idProdutora != '' &&  idProdutora != undefined && idProdutora > 0){
            let resultFilmeProducerID = await filmeProdutoraDAO.getSelectMoviesByIdProducer(Number(idProdutora))
            if(resultFilmeProducerID){
                if(resultFilmeProducerID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_produtora =       resultFilmeProducerID
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

 const inserirFilmeProdutora = async function (filmeProdutora, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){

            if (!filmeProdutora.tipo_participacao) filmeProdutora.tipo_participacao = null;
            let validacao = await validarDadosFilmeProdutora(filmeProdutora)
            if(!validacao) {
                let resultFilmeProducer = await filmeProdutoraDAO.setInsertMoviesProducer(filmeProdutora)

                if (resultFilmeProducer) {
                    let ultimoID = await filmeProdutoraDAO.getSelectLastProducerMovieId()

                    if(ultimoID) {
                        filmeProdutora.id = ultimoID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items    =       filmeProdutora

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validacao
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
 }

const atualizarFilmeProdutora = async function (filmeProdutora, contentType, id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            if (!filmeProdutora.tipo_participacao) filmeProdutora.tipo_participacao = null;
            let validacao = await validarDadosFilmeProdutora(filmeProdutora)
            if(!validacao){
                let confirmarId = await buscarFilmeProdutoraId(id)
                if(confirmarId.status_code == 200){
                    filmeProdutora.id = Number(id)

                    let resultFilmeProducer = await filmeProdutoraDAO.setUpdateMoviesProducer(filmeProdutora)
                    if(resultFilmeProducer){
                        
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.filmes_produtora   =       filmeProdutora
                        return MESSAGES.DEFAULT_HEADER
                    } else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return confirmarId
                }
            } else {
                return validacao
            }
        } else{
            return MESSAGES.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmeProdutora = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarID = await buscarFilmeProdutoraId(id)
        if(validarID.status_code == 200) {
            id = Number(id)

            let resultFilmeProducer = await filmeProdutoraDAO.setDeleteMoviesProducer(id)
            if(resultFilmeProducer){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message             =       MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER
            } else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return validarID
         }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmeProdutoraPorIdFilme = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeProducer = await filmeProdutoraDAO.setDeleteMoviesProducerByIdMovies(id)
            if(resultFilmeProducer === true || resultFilmeProducer === false){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message             =       MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmeProdutoraPoridProdutora = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeProducer = await filmeProdutoraDAO.setDeleteMoviesProducerByIdProducer(id)
            if(resultFilmeProducer === true || resultFilmeProducer === false){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message             =       MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const validarDadosFilmeProdutora = async function (filmeProdutora) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if(filmeProdutora.id_filme <= 0 ||isNaN(filmeProdutora.id_filme) || filmeProdutora.id_filme == "" || filmeProdutora.id_filme == null || filmeProdutora.id_filme == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Filme Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else if (filmeProdutora.id_produtora <= 0 ||isNaN(filmeProdutora.id_produtora) || filmeProdutora.id_produtora == "" || filmeProdutora.id_produtora == null || filmeProdutora.id_produtora == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Produtora Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (filmeProdutora.tipo_participacao != null && (typeof filmeProdutora.tipo_participacao != 'string' || filmeProdutora.tipo_participacao.length > 50)) {
         MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Tipo de participação inválido ou muito longo]'
         return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (filmeProdutora.produtora_principal !== undefined && filmeProdutora.produtora_principal !== null && typeof filmeProdutora.produtora_principal !== 'boolean') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Produtora Principal deve ser true ou false]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
   } else {
        return false
    }
}

module.exports = {
    listarFilmesProdutora,
    buscarFilmeProdutoraId,
    listarProdutoraIdFilme,
    listarFilmesIdProdutora,
    inserirFilmeProdutora,
    atualizarFilmeProdutora,
    excluirFilmeProdutora,
    excluirFilmeProdutoraPorIdFilme,
    excluirFilmeProdutoraPoridProdutora
}