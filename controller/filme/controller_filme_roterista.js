/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e diretor;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

//Import da model do DAO do filme Diretor
const filmeRoteristaDAO= require('../../model/DAO/filme_roterista.js')

//Import 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarFilmesRoterista = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultFilmeScreenwriter = await filmeRoteristaDAO.getSelectAllMoviesScreenwriter()
        if(resultFilmeScreenwriter){
            if(resultFilmeScreenwriter.length > 0){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_roterista       =       resultFilmeScreenwriter

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

const buscarFilmeRoteristaId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id != null && id != '' &&  id != undefined && id > 0){
            let resultFilmeScreenwritersID = await filmeRoteristaDAO.getSelectScreenwriterMoviesByID(Number(id))
            if(resultFilmeScreenwritersID){
                if(resultFilmeScreenwritersID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_roterista =       resultFilmeScreenwritersID
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
const listarRoteristaIdFilme = async function(idFilme){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idFilme) && idFilme != null && idFilme != '' &&  idFilme != undefined && idFilme > 0){
            let resultFilmeScreenwritersID = await filmeRoteristaDAO.getSelectScreenwriterByIdMovies(Number(idFilme))
            if(resultFilmeScreenwritersID){
                if(resultFilmeScreenwritersID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_roterista =       resultFilmeScreenwritersID
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
const listarFilmesIdRoterista = async function(idRoterista){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idRoterista) && idRoterista != null && idRoterista != '' &&  idRoterista != undefined && idRoterista > 0){
            let resultFilmeScreenwritersID = await filmeRoteristaDAO.getSelectMoviesByIdScreenwriter(Number(idRoterista))
            if(resultFilmeScreenwritersID){
                if(resultFilmeScreenwritersID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_roterista =       resultFilmeScreenwritersID
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

 const inserirFilmeRoterista = async function (filmeRoterista, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){

            if (!filmeRoterista.tipo_credito) filmeRoterista.tipo_credito = null;
            if (!filmeRoterista.detalhe_adaptacao) filmeRoterista.detalhe_adaptacao = null;
            let validacao = await validarDadosFilmeRoterista(filmeRoterista)
            if(!validacao) {
                let resultFilmeScreenwriter = await filmeRoteristaDAO.setInsertMoviesScreenwriter(filmeRoterista)

                if (resultFilmeScreenwriter) {
                    let ultimoID = await filmeRoteristaDAO.getSelectLastScreenwriterMovieId()

                    if(ultimoID) {
                        filmeRoterista.id = ultimoID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items    =       filmeRoterista

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

const atualizarFilmeRoterista = async function (filmeRoterista, contentType, id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            if (!filmeRoterista.tipo_credito) filmeRoterista.tipo_credito = null;
            if (!filmeRoterista.detalhe_adaptacao) filmeRoterista.detalhe_adaptacao = null;
            let validacao = await validarDadosFilmeRoterista(filmeRoterista)
            if(!validacao){
                let confirmarId = await buscarFilmeRoteristaId(id)
                if(confirmarId.status_code == 200){
                    filmeRoterista.id = Number(id)

                    let resultFilmeScreenwriters = await filmeRoteristaDAO.setUpdateMoviesScreenwriter(filmeRoterista)
                    if(resultFilmeScreenwriters){
                        
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.filmes_roterista   =       filmeRoterista
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

const excluirFilmeRoterista = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarID = await buscarFilmeRoteristaId(id)
        if(validarID.status_code == 200) {
            id = Number(id)

            let resultFilmeScreenwriters = await filmeRoteristaDAO.setDeleteMoviesScreenwriter(id)
            if(resultFilmeScreenwriters){
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

const excluirFilmeRoteristaPorIdFilme = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeScreenwriters = await filmeRoteristaDAO.setDeleteMoviesScreenwriterByIdMovies(id)
            if(resultFilmeScreenwriters === true || resultFilmeScreenwriters === false){
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

const excluirFilmeRoteristaPoridRoterista = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeScreenwriters = await filmeRoteristaDAO.setDeleteMoviesScreenwriterByIdScreenwriter(id)
            if(resultFilmeScreenwriters === true || resultFilmeScreenwriters === false){
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


const validarDadosFilmeRoterista = async function (filmeRoterista) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if(filmeRoterista.id_filme <= 0 ||isNaN(filmeRoterista.id_filme) || filmeRoterista.id_filme == "" || filmeRoterista.id_filme == null || filmeRoterista.id_filme == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Filme Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else if (filmeRoterista.tipo_credito != null && (typeof filmeRoterista.tipo_credito != 'string' || filmeRoterista.tipo_credito.length > 50)) {
         MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Tipo de Crédito inválido ou muito longo]'
         return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (filmeRoterista.detalhe_adaptacao != null && (typeof filmeRoterista.detalhe_adaptacao != 'string' || filmeRoterista.detalhe_adaptacao.length > 255)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Detalhe de adaptação inválido ou muito longo]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
   }
    else if (filmeRoterista.id_roterista <= 0 ||isNaN(filmeRoterista.id_roterista) || filmeRoterista.id_roterista == "" || filmeRoterista.id_roterista == null || filmeRoterista.id_roterista == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[id_roterista Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarFilmesRoterista,
    listarRoteristaIdFilme,
    listarFilmesIdRoterista,
    buscarFilmeRoteristaId,
    inserirFilmeRoterista,
    atualizarFilmeRoterista,
    excluirFilmeRoterista,
    excluirFilmeRoteristaPoridRoterista,
    excluirFilmeRoteristaPorIdFilme
}