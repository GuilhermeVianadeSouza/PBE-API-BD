/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de filme;
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const idiomaDAO = require('../../model/DAO/idioma.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarIdiomas = async function() {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultIdioma = await idiomaDAO.getSelectAllLanguage()
        if (resultIdioma){
            if(resultIdioma.length > 0){
            MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.items.idioma        =       resultIdioma

            return MESSAGES.DEFAULT_HEADER //200
            } else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
     return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarIdiomaPorID = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id !='' && id !=undefined && id != null && id > 0){
            let resultIdiomaID = await idiomaDAO.getSelectLanguageByID(Number(id))
            if(resultIdiomaID)
                if(resultIdiomaID.length > 0){
                MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.idioma    =       resultIdiomaID

                return MESSAGES.DEFAULT_HEADER
                }else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
             else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            MESSAGENS.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGENS.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGENS.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const criarIdioma = async function(idioma, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDadosIdioma(idioma)

            if(!validar){
                //processamento da verdadeira
                let resultIdioma = await idiomaDAO.setInsertLanguage(idioma)

                if (resultIdioma){
                    let lastID = await idiomaDAO.getSelectLastLanguageId()
                    if(lastID){
                        idioma.id_idioma = lastID 
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         =       MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.idioma    =       idioma

                        return MESSAGES.DEFAULT_HEADER //201
                    } else{
                        return MESSAGES.ERROR_REQUIRED_FIELDS //400
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDadosIdioma
            }
        } else{
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const atualizarIdioma = async function(idioma, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosIdioma(idioma)
            if(!validar) {
                let confirmarID = await listarIdiomaPorID(id)

                if (confirmarID.status_code == 200){
                    idioma.id_idioma = Number(id)

                    let atualizarDados = await idiomaDAO.setUpdateLanguage(idioma)
                    console.log(atualizarDados)
                    if(atualizarDados) {

                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.idioma    =       idioma
                        return MESSAGES.DEFAULT_HEADER
                    } else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else{
                    return listarIdiomaPorID
                }
            } else{
                return validarDadosIdioma
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const deletarIdioma = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarIdiomaPorID(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirIdioma = await generoDAO.deleteLanguageByID(id)
            if(excluirIdioma){
                MESSAGES.DEFAULT_HEADER.status          =           MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code     =           MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message         =           MESSAGES.SUCESS_DELETED_ITEM.message
                console.log(MESSAGES.DEFAULT_HEADER)

                return MESSAGES.DEFAULT_HEADER
            } else {
                return ERROR_REQUIRED_FIELDS
            }         
        } else{
            return verificacaoID
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosIdioma = async function (idioma){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if(idioma.nome == '' || idioma.nome == undefined || idioma.nome == null || idioma.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if(idioma.sigla == '' || idioma.sigla == undefined || idioma.sigla == null || idioma.sigla.length > 10){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira uma sigla válida.]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else {
        return false //Nessa situação o validar vai ver se ele se enquadra em todo o if, se não, ele pode continuar o processo
    }
}

module.exports = {
    listarIdiomas,
    listarIdiomaPorID,
    criarIdioma,
    atualizarIdioma,
    deletarIdioma
}