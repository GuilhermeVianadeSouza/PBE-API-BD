/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD da tabela ator;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const atorDAO = require('../../model/DAO/ator.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsAtores = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultAtor = await atorDAO.getSelectAllActors()
                if(resultAtor){
                    if(resultAtor.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.ator             =           resultAtor
        
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

const listarAtorPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id !='' && id !=null && id !=undefined && id > 0){
            let resultAtor = await atorDAO.getSelectActorById(id)
                if(resultAtor){
                    if(resultAtor.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.ator             =           resultAtor
        
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

const criarAtor = async function (ator, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosAtor(ator)

            if(!validar){
                let resultAtor = await atorDAO.setInsertActor(ator)
                if(resultAtor){
                    let lastID = await atorDAO.getSelectLastActorId()
                    if(lastID){
                        ator.id_ator = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.ator      =       ator

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

const atualizarAtor = async function(ator, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosAtor(ator)
            if(!validar) {
                let confirmarID = await listarAtorPorId(id)

                if (confirmarID.status_code == 200){
                    ator.id_ator = Number(id)

                    let atualizarDados = await atorDAO.setUpdateActor(ator)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.ator    =       ator
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

const deletarAtor = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarAtorPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirAtor = await atorDAO.deleteActor(id)
            if(excluirAtor) {
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

const validarDadosAtor = async function(ator){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(ator.nome == '' || typeof ator.nome != 'string' ||ator.nome == undefined || ator.nome == null || ator.nome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else if (!ator.id_pais || isNaN(ator.id_pais)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = 'O ID do país é obrigatório e deve ser um número.';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(ator.idade && isNaN(ator.idade)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo idade deve ser númerico]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        } if(!ator.idade){
                ator.idade = null
            }
        else if(ator.altura_cm && isNaN(ator.altura_cm)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = 'A altura deve ser numérica (em cm).';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(ator.nome_artistico && ator.nome_artistico.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo nome_artistico excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        } if(!ator.nome_artistico){
                ator.nome_artistico = null
            }
        else if(ator.biografia && ator.biografia.length > 65000){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo biografia excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!ator.biografia){
                ator.biografia = null
            }
        else if(ator.data_nascimento) {
            const dataTeste = new Date(ator.data_nascimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(ator.data_falecimento) {
            const dataTeste = new Date(ator.data_falecimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(ator.premio_destaque && ator.premio_destaque.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo premio_destaque excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        } if(!ator.premio_destaque){
                ator.premio_destaque = null
            }
        else if(ator.foto_perfil_url && ator.foto_perfil_url.length > 256){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo foto_perfil_url excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!ator.foto_perfil_url){
                ator.foto_perfil_url = null
            }
        else {
            return false
        }
}

module.exports = {
    listarTodosOsAtores,
    listarAtorPorId,
    criarAtor,
    atualizarAtor,
    deletarAtor
}