/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e genero;
 * Data: 05/11/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

//Import da model do DAO do filme Genero
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//Import 
const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarFilmesGeneros = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultFilmesGenero = await filmeGeneroDAO.getSelectAllMoviesGenre()
        if(resultFilmesGenero){
            if(resultFilmesGenero.length > 0){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_generos        =       resultFilmesGenero

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

const buscarFilmeGeneroId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id != null && id != '' &&  id != undefined && id > 0){
            let resultFilmesGenerosID = await filmeGeneroDAO.getSelectGenreMoviesByID(Number(id))
            if(resultFilmesGenerosID){
                if(resultFilmesGenerosID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos =       resultFilmesGenerosID
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
const listarGenerosIdFilme = async function(idFilme){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idFilme) && idFilme != null && idFilme != '' &&  idFilme != undefined && idFilme > 0){
            let resultFilmesGenerosID = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(idFilme))
            if(resultFilmesGenerosID){
                if(resultFilmesGenerosID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos =       resultFilmesGenerosID
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
const listarFilmesIdGenero = async function(idGenero){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(idGenero) && idGenero != null && idGenero != '' &&  idGenero != undefined && idGenero > 0){
            let resultFilmesGenerosID = await filmeGeneroDAO.getSelectMoviesByIdGenres(Number(idGenero))
            if(resultFilmesGenerosID){
                if(resultFilmesGenerosID.length > 0){
                    MESSAGES.DEFAULT_HEADER.status         =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code    =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos =       resultFilmesGenerosID
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

 const inserirFilmeGenero = async function (filmeGenero, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validacao = await validarDadosFilmeGenero(filmeGenero)
            if(!validacao) {
                let resultFilmeGenre = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero)

                if (resultFilmeGenre) {
                    let ultimoID = await filmeGeneroDAO.getSelectLastGenreByID()

                    if(ultimoID) {
                        filmeGenero.id = ultimoID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items    =       filmeGenero

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validarDadosGenero
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
 }

const atualizarFilmeGenero = async function (filmeGenero, contentType, id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validacao = await validarDadosFilmeGenero(filmeGenero)
            if(!validacao){
                let confirmarId = await buscarFilmeGeneroId(id)
                if(confirmarId.status_code == 200){
                    filmeGenero.id = Number(id)

                    let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)
                    if(resultFilmesGeneros){
                        
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.filme_genero   =       filmeGenero
                        return MESSAGES.DEFAULT_HEADER
                    } else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return listarGeneroPorID
                }
            } else {
                return validarDadosGenero
            }
        } else{
            return MESSAGES.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmeGenero = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarID = await buscarFilmeGeneroId(id)
        if(validarID.status_code == 200) {
            id = Number(id)

            let resultFilmesGeneros = await filmeGeneroDAO.setdeleteMoviesGenres(id)
            if(resultFilmesGeneros){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message             =       MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER
            } else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return listarGeneroPorID
         }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmeGeneroPorIdFilme = async function (id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
            let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenresByIdMovies(id)
            if(resultFilmesGeneros === true || resultFilmesGeneros === false){
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


const validarDadosFilmeGenero = async function (filmeGenero) {
    if(filmeGenero.id_filme <= 0 ||isNaN(filmeGenero.id_filme) || filmeGenero.id_filme == "" || filmeGenero.id_filme == null || filmeGenero.id_filme == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Filme Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filmeGenero.id_genero <= 0 ||isNaN(filmeGenero.id_genero) || filmeGenero.id_genero == "" || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS += '[Id_Genero Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    excluirFilmeGeneroPorIdFilme
}