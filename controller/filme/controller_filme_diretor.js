/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e diretor;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

//Import da model do DAO do filme Diretor
const filmeDiretorDAO = require('../../model/DAO/filme_diretor.js')

//Import 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarFilmesDiretor = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultFilmeDirector = await filmeDiretorDAO.getSelectAllMoviesDirector()
        if(resultFilmeDirector){
            if(resultFilmeDirector.length > 0){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_diretor        =       resultFilmeDirector

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

const buscarFilmeDiretorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id != null && id != '' &&  id != undefined && id > 0){
            let resultFilmeDirectorsID = await filmeDiretorDAO.getSelectDirectorMoviesByID(Number(id))
            if(resultFilmeDirectorsID){
                if(resultFilmeDirectorsID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_diretor =       resultFilmeDirectorsID
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
const listarDiretorIdFilme = async function(idFilme){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idFilme) && idFilme != null && idFilme != '' &&  idFilme != undefined && idFilme > 0){
            let resultFilmeDirectorsID = await filmeDiretorDAO.getSelectDirectorsByIdMovies(Number(idFilme))
            if(resultFilmeDirectorsID){
                if(resultFilmeDirectorsID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_diretor =       resultFilmeDirectorsID
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
const listarFilmesIdDiretor = async function(idDiretor){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idDiretor) && idDiretor != null && idDiretor != '' &&  idDiretor != undefined && idDiretor > 0){
            let resultFilmeDirectorsID = await filmeDiretorDAO.getSelectMoviesByIdDirector(Number(idDiretor))
            if(resultFilmeDirectorsID){
                if(resultFilmeDirectorsID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_diretor =       resultFilmeDirectorsID
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

 const inserirFilmeDiretor = async function (filmeDiretor, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validacao = await validarDadosFilmeDiretor(filmeDiretor)
            if(!validacao) {
                let resultFilmeGenre = await filmeDiretorDAO.setInsertMoviesDirector(filmeDiretor)

                if (resultFilmeGenre) {
                    let ultimoID = await filmeDiretorDAO.getSelectLastDirectorGenreId()

                    if(ultimoID) {
                        filmeDiretor.id = ultimoID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items    =       filmeDiretor

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

const atualizarFilmeDiretor = async function (filmeDiretor, contentType, id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validacao = await validarDadosFilmeDiretor(filmeDiretor)
            if(!validacao){
                let confirmarId = await buscarFilmeDiretorId(id)
                if(confirmarId.status_code == 200){
                    filmeDiretor.id = Number(id)

                    let resultFilmeDirectors = await filmeDiretorDAO.setUpdateMoviesDirector(filmeDiretor)
                    if(resultFilmeDirectors){
                        
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.filme_diretor   =       filmeDiretor
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

const excluirFilmeDiretor = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarID = await buscarFilmeDiretorId(id)
        if(validarID.status_code == 200) {
            id = Number(id)

            let resultFilmeDirectors = await filmeDiretorDAO.setDeleteMoviesDirector(id)
            if(resultFilmeDirectors){
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

const excluirFilmeDiretorPorIdFilme = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeDirectors = await filmeDiretorDAO.setDeleteMoviesDirectorsByIdMovies(id)
            if(resultFilmeDirectors === true || resultFilmeDirectors === false){
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

const excluirFilmeDiretorPorIdDiretor = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmeDirectors = await filmeDiretorDAO.setDeleteMoviesDirectorsByIdDirector(id)
            if(resultFilmeDirectors === true || resultFilmeDirectors === false){
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


const validarDadosFilmeDiretor = async function (filmeDiretor) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if(filmeDiretor.id_filme <= 0 ||isNaN(filmeDiretor.id_filme) || filmeDiretor.id_filme == "" || filmeDiretor.id_filme == null || filmeDiretor.id_filme == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Filme Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else if (filmeDiretor.tipo_direcao == '' || filmeDiretor.tipo_direcao == null || filmeDiretor.tipo_direcao == undefined || filmeDiretor.tipo_direcao.length > 100 || typeof filmeDiretor.tipo_direcao != 'string'){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um tipo de direcao correto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (filmeDiretor.id_diretor <= 0 ||isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor == "" || filmeDiretor.id_diretor == null || filmeDiretor.id_diretor == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[id_diretor Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarFilmesDiretor,
    listarDiretorIdFilme,
    listarFilmesIdDiretor,
    buscarFilmeDiretorId,
    inserirFilmeDiretor,
    atualizarFilmeDiretor,
    excluirFilmeDiretor,
    excluirFilmeDiretorPorIdDiretor,
    excluirFilmeDiretorPorIdFilme
}