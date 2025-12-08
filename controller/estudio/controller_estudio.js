/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados na tabela dublador;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const estudioDAO = require('../../model/DAO/estudio.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsEstudios = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultEstudio = await estudioDAO.getSelectAllStudio()
                if(resultEstudio){
                    if(resultEstudio.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.estudio             =           resultEstudio
        
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

const listarEstudioPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id), id !='', id !=null, id !=undefined, id > 0){
            let resultEstudio = await estudioDAO.getSelectStudioById(id)
                if(resultEstudio){
                    if(resultEstudio.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.estudio             =           resultEstudio
        
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

const criarEstudio = async function (estudio, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosEstudio(estudio)

            if(!validar){
                let resultEstudio = await estudioDAO.setInsertStudio(estudio)
                if(resultEstudio){
                    let lastID = await estudioDAO.getSelectLastStudioId()
                    if(lastID){
                        estudio.id_estudio = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.estudio      =       estudio

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

const atualizarEstudio = async function(estudio, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosEstudio(estudio)
            if(!validar) {
                let confirmarID = await listarEstudioPorId(id)

                if (confirmarID.status_code == 200){
                    estudio.id_estudio = Number(id)

                    let atualizarDados = await estudioDAO.setUpdateStudio(estudio)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.estudio    =       estudio
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

const deletarEstudio = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarEstudioPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirEstudio = await estudioDAO.deleteStudio(id)
            if(excluirEstudio) {
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

const validarDadosEstudio = async function(estudio){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(estudio.nome == '' || typeof estudio.nome != 'string' ||estudio.nome == undefined || estudio.nome == null || estudio.nome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else if (!estudio.id_pais || isNaN(estudio.id_pais)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = 'O ID do país é obrigatório e deve ser um número.';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(estudio.especialidade && estudio.especialidade.length > 30){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo especialidade excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!estudio.especialidade){
                estudio.especialidade = null
            }
        else if(estudio.data_fundacao) {
            const dataTeste = new Date(estudio.data_fundacao);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else {
            return false
        }
}

module.exports = {
    listarTodosOsEstudios,
    listarEstudioPorId,
    criarEstudio,
    atualizarEstudio,
    deletarEstudio
}