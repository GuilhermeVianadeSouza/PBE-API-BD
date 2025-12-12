/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD da tabela personagem;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const personagemDAO = require('../../model/DAO/personagem.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsPersonagem = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultPersonagem = await personagemDAO.getSelectAllCharacter()
                if(resultPersonagem){
                    if(resultPersonagem.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.personagem             =           resultPersonagem
        
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

const listarPersonagemPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id !='' && id !=null && id !=undefined && id > 0){
            let resultPersonagem = await personagemDAO.getSelectCharacterByID(id)
                if(resultPersonagem){
                    if(resultPersonagem.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.personagem             =           resultPersonagem
        
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

const criarPersonagem = async function (personagem, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosPersonagem(personagem)

            if(!validar){
                let resultPersonagem = await personagemDAO.setInsertCharacter(personagem)
                if(resultPersonagem){
                    let lastID = await personagemDAO.getSelectLastCharacterId()
                    if(lastID){
                        personagem.id_personagem = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.personagem      =       personagem

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

const atualizarPersonagem = async function(personagem, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosPersonagem(personagem)
            if(!validar) {
                let confirmarID = await listarPersonagemPorId(id)

                if (confirmarID.status_code == 200){
                    personagem.id_personagem = Number(id)

                    let atualizarDados = await personagemDAO.setUpdateCharacter(personagem)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.personagem    =       personagem
                        return MESSAGES.DEFAULT_HEADER
                    } else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else{
                    return listarPersonagemPorId
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

const deletarPersonagem = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarPersonagemPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirPersonagem = await personagemDAO.deleteCharacter(id)
            if(excluirPersonagem) {
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

const validarDadosPersonagem = async function(personagem){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(personagem.nome == '' || typeof personagem.nome != 'string' ||personagem.nome == undefined || personagem.nome == null || personagem.nome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else if(personagem.codinome && personagem.codinome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo codinome excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        } if(!personagem.codinome){
                personagem.codinome = null
            }
        else if(personagem.descricao && personagem.descricao.length > 300){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo descricao excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        } if(!personagem.descricao){
                personagem.descricao = null
            }
        else if(personagem.historia_origem && personagem.historia_origem.length > 5000){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo historia_origem excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!personagem.historia_origem){
                personagem.historia_origem = null
            }
        else if(personagem.foto_url && personagem.foto_url.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo foto_url excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!personagem.foto_url){
                personagem.foto_url = null
            }
        else if(personagem.ocupacao && personagem.ocupacao.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo ocupacao excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!personagem.ocupacao){
                personagem.ocupacao = null
            }
        else {
            return false
        }
}

module.exports = {
    listarTodosOsPersonagem,
    listarPersonagemPorId,
    criarPersonagem,
    atualizarPersonagem,
    deletarPersonagem
}