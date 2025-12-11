/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e estudio;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

//Import da model do DAO do filme Diretor
const filmeEstudioDAO= require('../../model/DAO/filme_estudio.js')

//Import 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarFilmesEstudio = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultFilmeStudio = await filmeEstudioDAO.getSelectAllMoviesStudio()
        if(resultFilmeStudio){
            if(resultFilmeStudio.length > 0){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_estudio       =       resultFilmeStudio

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

const buscarFilmeEstudioId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id != null && id != '' &&  id != undefined && id > 0){
            let resultFilmeStudioID = await filmeEstudioDAO.getSelectStudioMoviesByID(Number(id))
            if(resultFilmeStudioID){
                if(resultFilmeStudioID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_estudio =       resultFilmeStudioID
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
const listarEstudioIdFilme = async function(idFilme){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idFilme) && idFilme != null && idFilme != '' &&  idFilme != undefined && idFilme > 0){
            let resultFilmeStudioID = await filmeEstudioDAO.getSelectStudioByIdMovies(Number(idFilme))
            if(resultFilmeStudioID){
                if(resultFilmeStudioID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_estudio =       resultFilmeStudioID
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
const listarFilmesIdEstudio = async function(idEstudio){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idEstudio) && idEstudio != null && idEstudio != '' &&  idEstudio != undefined && idEstudio > 0){
            let resultFilmeStudioID = await filmeEstudioDAO.getSelectMoviesByIdStudio(Number(idEstudio))
            if(resultFilmeStudioID){
                if(resultFilmeStudioID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_estudio =       resultFilmeStudioID
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

 const inserirFilmeEstudio = async function (filmeEstudio, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){

            let validacao = await validarDadosEstudio(filmeEstudio)
            if(!validacao) {
                let resultFilmeStudio = await filmeEstudioDAO.setInsertMoviesStudio(filmeEstudio)

                if (resultFilmeStudio) {
                    let ultimoID = await filmeEstudioDAO.getSelectLastStudioMovieId()

                    if(ultimoID) {
                        filmeEstudio.id = ultimoID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items    =       filmeEstudio

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

const atualizarFilmeEstudio = async function (filmeEstudio, contentType, id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validacao = await validarDadosEstudio(filmeEstudio)
            if(!validacao){
                let confirmarId = await buscarFilmeEstudioId(id)
                if(confirmarId.status_code == 200){
                    filmeEstudio.id = Number(id)

                    let resultFilmeStudio = await filmeEstudioDAO.setUpdateMoviesStudio(filmeEstudio)
                    if(resultFilmeStudio){
                        
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.filmes_estudio   =       filmeEstudio
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

const excluirFilmeEstudio = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarID = await buscarFilmeEstudioId(id)
        if(validarID.status_code == 200) {
            id = Number(id)

            let resultFilmeStudio = await filmeEstudioDAO.setDeleteMoviesStudio(id)
            if(resultFilmeStudio){
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

const excluirFilmeEstudioPorIdFilme = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeStudio = await filmeEstudioDAO.setDeleteMoviesStudioByIdMovies(id)
            if(resultFilmeStudio === true || resultFilmeStudio === false){
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

const excluirFilmeEstudioPoridEstudio = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeStudio = await filmeEstudioDAO.setDeleteMoviesStudioByIdStudio(id)
            if(resultFilmeStudio === true || resultFilmeStudio === false){
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


const validarDadosEstudio = async function (filmeEstudio) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if(filmeEstudio.id_filme <= 0 ||isNaN(filmeEstudio.id_filme) || filmeEstudio.id_filme == "" || filmeEstudio.id_filme == null || filmeEstudio.id_filme == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Filme Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else if (filmeEstudio.id_estudio <= 0 ||isNaN(filmeEstudio.id_estudio) || filmeEstudio.id_estudio == "" || filmeEstudio.id_estudio == null || filmeEstudio.id_estudio == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[id_Estudio Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (filmeEstudio.tipo_associacao == undefined || filmeEstudio.tipo_associacao == null || filmeEstudio.tipo_associacao == '' || filmeEstudio.tipo_associacao.length > 50){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [O tipo de associação deve ser informado. Incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS
   } else {
        return false
    }
}

module.exports = {
    listarFilmesEstudio,
    buscarFilmeEstudioId,
    listarEstudioIdFilme,
    listarFilmesIdEstudio,
    inserirFilmeEstudio,
    atualizarFilmeEstudio,
    excluirFilmeEstudio,
    excluirFilmeEstudioPorIdFilme,
    excluirFilmeEstudioPoridEstudio
}