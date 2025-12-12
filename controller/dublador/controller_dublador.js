/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados na tabela dublador;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const dubladorDAO = require('../../model/DAO/dublador.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsDubladores = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultDublador = await dubladorDAO.getSelectAllVoiceActor()
                if(resultDublador){
                    if(resultDublador.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublador             =           resultDublador
        
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

const listarDubladorPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id !='' && id !=null && id !=undefined && id > 0){
            let resultDublador = await dubladorDAO.getSelectVoiceActorById(id)
                if(resultDublador){
                    if(resultDublador.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublador             =           resultDublador
        
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

const criarDublador = async function (dublador, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosDublador(dublador)

            if(!validar){
                let resultDublador = await dubladorDAO.setInsertVoiceActor(dublador)
                if(resultDublador){
                    let lastID = await dubladorDAO.getSelectLastVoiceActorId()
                    if(lastID){
                        dublador.id_dublador = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublador      =       dublador

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

const atualizarDublador = async function(dublador, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosDublador(dublador)
            if(!validar) {
                let confirmarID = await listarDubladorPorId(id)

                if (confirmarID.status_code == 200){
                    dublador.id_dublador = Number(id)

                    let atualizarDados = await dubladorDAO.setUpdateVoiceActor(dublador)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.dublador    =       dublador
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

const deletarDublador = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarDubladorPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirDublador = await dubladorDAO.deleteVoiceActor(id)
            if(excluirDublador) {
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

const validarDadosDublador = async function(dublador){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(dublador.nome == '' || typeof dublador.nome != 'string' ||dublador.nome == undefined || dublador.nome == null || dublador.nome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else if (!dublador.id_pais || isNaN(dublador.id_pais)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = 'O ID do país é obrigatório e deve ser um número.';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(dublador.biografia && dublador.biografia.length > 65000){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo biografia excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!dublador.biografia){
                dublador.biografia = null
            }
        else if(dublador.data_nascimento) {
            const dataTeste = new Date(dublador.data_nascimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(dublador.data_falecimento) {
            const dataTeste = new Date(dublador.data_falecimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(dublador.estudio_principal && dublador.estudio_principal > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo estudio principal excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!dublador.estudio_principal){
                dublador.estudio_principal = null
            }
        else if(dublador.ativo === null || dublador.ativo === undefined || typeof dublador.ativo !== 'boolean'){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo ativo deve ser um BOOLEAN.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
}

module.exports = {
    listarTodosOsDubladores,
    listarDubladorPorId,
    criarDublador,
    atualizarDublador,
    deletarDublador
}