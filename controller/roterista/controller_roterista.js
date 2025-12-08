/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados na tabela roterista;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const roteristaDAO = require('../../model/DAO/roterista.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsRoterista = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultRoterista = await roteristaDAO.getSelectAllScreenwriter()
                if(resultRoterista){
                    if(resultRoterista.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.roterista             =           resultRoterista
        
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

const listarRoteristaPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id), id !='', id !=null, id !=undefined, id > 0){
            let resultRoterista = await roteristaDAO.getSelectScreenwriterById(id)
                if(resultRoterista){
                    if(resultRoterista.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.roterista             =           resultRoterista
        
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

const criarRoterista = async function (roterista, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosRoterista(roterista)

            if(!validar){
                let resultRoterista = await roteristaDAO.setInsertScreenwriter(roterista)
                if(resultRoterista){
                    let lastID = await roteristaDAO.getSelectLastScreenwriterId()
                    if(lastID){
                        roterista.id_roterista = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.roterista      =       roterista

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

const atualizarRoterista = async function(roterista, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosRoterista(roterista)
            if(!validar) {
                let confirmarID = await listarRoteristaPorId(id)

                if (confirmarID.status_code == 200){
                    roterista.id_roterista = Number(id)

                    let atualizarDados = await roteristaDAO.setUpdateScreenwriter(roterista)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.roterista    =       roterista
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

const deletarRoterista = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarRoteristaPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirroterista = await roteristaDAO.deleteScreenwriter(id)
            if(excluirroterista) {
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

const validarDadosRoterista = async function(roterista){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(roterista.nome == '' || typeof roterista.nome != 'string' ||roterista.nome == undefined || roterista.nome == null || roterista.nome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else if (!roterista.id_pais || isNaN(roterista.id_pais)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = 'O ID do país é obrigatório e deve ser um número.';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(roterista.biografia && roterista.biografia.length > 65000){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo biografia excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!roterista.biografia){
                roterista.biografia = null
            }
        else if(roterista.data_nascimento) {
            const dataTeste = new Date(roterista.data_nascimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(roterista.data_falecimento) {
            const dataTeste = new Date(roterista.data_falecimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(roterista.estudio_principal && roterista.estudio_principal > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo estudio principal excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!roterista.estudio_principal){
                roterista.estudio_principal = null
            }
        else if(roterista.ativo === null || roterista.ativo === undefined || typeof roterista.ativo !== 'boolean'){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo ativo deve ser um BOOLEAN.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (roterista.mini_bio == '' || typeof roterista.mini_bio != 'string' ||roterista.mini_bio == undefined || roterista.mini_bio == null || roterista.mini_bio.length > 300){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira uma mini biografia valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else {
            return false
        }
}

module.exports = {
    listarTodosOsRoterista,
    listarRoteristaPorId,
    criarRoterista,
    atualizarRoterista,
    deletarRoterista
}