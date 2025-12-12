/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de país;
 * Data: 29/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const paisDAO = require('../../model/DAO/pais.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsPaises = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultPaises = await paisDAO.getSelectAllCountry()
        if(resultPaises){
            if(resultPaises.length > 0){
                MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.pais             =           resultPaises

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarPaisporID = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id), id !='', id !=null, id !=undefined, id > 0) {
            let resultPaisbyId = await paisDAO.getSelectCountrybyID(id)
            if(resultPaisbyId){
                if(resultPaisbyId.length > 0){
                    MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.pais      =       resultPaisbyId

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
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

const criarPais = async function (pais, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDadosPais(pais)

            if(!validar){
                let resultPais = await paisDAO.setInsertCountry(pais)
                if(resultPais){
                    let lastID = await paisDAO.getSelectLastCountryId()
                    if(lastID){
                        pais.id_pais = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.pais      =       pais

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

const atualizarPais = async function(pais, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosPais(pais)
            if(!validar) {
                let confirmarID = await listarPaisporID(id)

                if (confirmarID.status_code == 200){
                    pais.id_pais = Number(id)

                    let atualizarDados = await paisDAO.setUpdateCountry(pais)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.pais    =       pais
                        return MESSAGES.DEFAULT_HEADER
                    } else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else{
                    return listarPaisporID
                }
            } else{
                return validarDadosPais
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const deletarPais = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarPaisporID(id)

        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirPais = await paisDAO.deleteCountry(id)
            if(excluirPais) {
                MESSAGES.DEFAULT_HEADER.status      =       MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code =       MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message    =       MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER
               
            } else{
                return ERROR_REQUIRED_FIELDS
            }
        } else {
            return verificacaoID
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosPais = async function(pais){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if(pais.nome == '' || pais.nome == undefined || pais.nome == null || pais.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }else if(pais.sigla == '' || pais.sigla == undefined || pais.sigla == null || pais.sigla.length > 2){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira uma sigla valida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if(pais.nacionalidade == '' || pais.nacionalidade == undefined || pais.nacionalidade == null || pais.nacionalidade.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira a nacionalidade masculina de forma correta.]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else{
        return false
    }
}

module.exports = {
    listarTodosOsPaises,
    listarPaisporID,
    atualizarPais,
    criarPais,
    deletarPais
}