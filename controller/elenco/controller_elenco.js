/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados na tabela dublador;
 * Data: 11/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const elencoDAO = require('../../model/DAO/elenco.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsElencos = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultElenco = await elencoDAO.getSelectAllCast()
                if(resultElenco){
                    if(resultElenco.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.elenco             =           resultElenco
        
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

const listarElencoPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id !='' && id !=null && id !=undefined && id > 0){
            let resultElenco = await elencoDAO.getSelectCastById(id)
                if(resultElenco){
                    if(resultElenco.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.elenco             =           resultElenco
        
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

const criarElenco = async function (elenco, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosElencos(elenco)

            if(!validar){
                let resultElenco = await elencoDAO.setInsertCast(elenco)
                if(resultElenco){
                    let lastID = await elencoDAO.getSelectLastCastId()
                    if(lastID){
                        elenco.id_elenco = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.elenco      =       elenco

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

const atualizarElenco = async function(elenco, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosElencos(elenco)
            if(!validar) {
                let confirmarID = await listarElencoPorId(id)

                if (confirmarID.status_code == 200){
                    elenco.id_elenco = Number(id)

                    let atualizarDados = await elencoDAO.setUpdateCast(elenco)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.elenco    =       elenco
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

const deletarElenco = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarElencoPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirElenco = await elencoDAO.deleteCast(id)
            console.log(excluirElenco)
            if(excluirElenco) {
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

const validarDadosElencos = async function(elenco){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(!elenco.id_filme || isNaN(elenco.id_filme)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[O ID do filme é obrigatório e deve ser um número.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }else if (!elenco.id_personagem || isNaN(elenco.id_personagem)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = '[O ID do personagem é obrigatório e deve ser um número.]';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(!elenco.id_ator || isNaN(elenco.id_ator)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[O ID do ator é obrigatório e deve ser um numero]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!elenco.biografia){
                elenco.biografia = null
            }
        else if(typeof elenco.tipo_atuacao != 'string' || elenco.tipo_atuacao == undefined || elenco.tipo_atuacao == null || elenco.tipo_atuacao.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo tipo_atuacao é obrigatório ou excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!elenco.estudio_principal){
                elenco.estudio_principal = null
            }
        else if(typeof elenco.funcao_dramatica != 'string' || elenco.funcao_dramatica == undefined || elenco.funcao_dramatica == null || elenco.funcao_dramatica.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[A função dramatica é obrigatoria e deve ser um String]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
}

module.exports = {
    listarTodosOsElencos,
    listarElencoPorId,
    criarElenco,
    atualizarElenco,
    deletarElenco
}