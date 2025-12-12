/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados na tabela dublador;
 * Data: 11/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const dublagemDAO = require('../../model/DAO/dublagem.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosAsDublagem = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultDublagem = await dublagemDAO.getSelectAllDubbing()
                if(resultDublagem){
                    if(resultDublagem.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublagem             =           resultDublagem
        
                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    }
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarDublagemPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id !='' && id !=null && id !=undefined && id > 0){
            let resultDublagem = await dublagemDAO.getSelectDubbingById(id)
                if(resultDublagem){
                    if(resultDublagem.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublagem            =           resultDublagem
        
                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    }
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS += `[ID NÃO VALIDO, INSIRA UM VALOR VÁLIDO]`
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const criarDublagem = async function (dublagem, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosdublagems(dublagem)

            if(!validar){
                let resultDublagem = await dublagemDAO.setInsertDubbing(dublagem)
                if(resultDublagem){
                    let lastID = await dublagemDAO.getSelectLastDubbingId()
                    if(lastID){
                        dublagem.id_dublagem = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublagem      =       dublagem

                        return MESSAGES.DEFAULT_HEADER
                    } else{
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
             } else {
                 return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarDublagem = async function(dublagem, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosdublagems(dublagem)
            if(!validar) {
                let confirmarID = await listarDublagemPorId(id)

                if (confirmarID.status_code == 200){
                    dublagem.id_dublagem = Number(id)

                    let atualizarDados = await dublagemDAO.setUpdateDubbing(dublagem)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublagem    =       dublagem
                        return MESSAGES.DEFAULT_HEADER
                    } else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else{
                    return confirmarID
                }
            } else{
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const deletarDublagem = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarDublagemPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirdublagem = await dublagemDAO.deleteDubbing(id)

            if(excluirdublagem) {
                MESSAGES.DEFAULT_HEADER.status      =       MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code =       MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message    =       MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER
               
            } else{
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
        } else {
            return verificacaoID
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosdublagems = async function(dublagem){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(!dublagem.id_idioma || isNaN(dublagem.id_idioma)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[O ID do idioma é obrigatório e deve ser um número.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }else if (!dublagem.id_dublador || isNaN(dublagem.id_dublador)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = '[O ID do dublador é obrigatório e deve ser um número.]';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(!dublagem.id_elenco || isNaN(dublagem.id_elenco)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[O ID do elenco é obrigatório e deve ser um numero]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!dublagem.biografia){
                dublagem.biografia = null
            }
        else if(dublagem.tipo_dublagem && dublagem.tipo_dublagem.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo tipo_dublagem excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        } if(!dublagem.tipo_dublagem){
                dublagem.tipo_dublagem = null
        }
        else {
            return false
        }
}

module.exports = {
    listarTodosAsDublagem,
    listarDublagemPorId,
    criarDublagem,
    atualizarDublagem,
    deletarDublagem
}