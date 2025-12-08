/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados na tabela diretor;
 * Data: 12/11/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const diretorDAO = require('../../model/DAO/diretor.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsDiretores = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultDiretor = await diretorDAO.getSelectAllDirector()
                if(resultDiretor){
                    if(resultDiretor.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.diretor             =           resultDiretor
        
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

const listarDiretorPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id), id !='', id !=null, id !=undefined, id > 0){
            let resultDiretor = await diretorDAO.getSelectDirectorById(id)
                if(resultDiretor){
                    if(resultDiretor.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.diretor             =           resultDiretor
        
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

const criarDiretor = async function (diretor, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosDiretor(diretor)

            if(!validar){
                let resultDiretor = await diretorDAO.setInsertDirector(diretor)
                if(resultDiretor){
                    let lastID = await diretorDAO.getSelectLastDirectorId()
                    if(lastID){
                        diretor.id_diretor = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.diretor      =       diretor

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

const atualizarDiretor = async function(diretor, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosDiretor(diretor)
            if(!validar) {
                let confirmarID = await listarDiretorPorId(id)

                if (confirmarID.status_code == 200){
                    diretor.id_diretor = Number(id)

                    let atualizarDados = await diretorDAO.setUpdateDirector(diretor)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.diretor    =       diretor
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

const deletarDiretor = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarDiretorPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirdiretor = await diretorDAO.deleteDirector(id)
            if(excluirdiretor) {
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

const validarDadosDiretor = async function(diretor){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(diretor.nome == '' || typeof diretor.nome != 'string' ||diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else if (!diretor.id_pais || isNaN(diretor.id_pais)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = 'O ID do país é obrigatório e deve ser um número.';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(diretor.biografia && diretor.biografia.length > 65000){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo biografia excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!diretor.biografia){
                diretor.biografia = null
            }
        else if(diretor.data_nascimento) {
            const dataTeste = new Date(diretor.data_nascimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(diretor.data_falecimento) {
            const dataTeste = new Date(diretor.data_falecimento);
            if (isNaN(dataTeste.getTime())) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Data inválida.';
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        }
        else if(diretor.foto_url && diretor.foto_url.length > 256){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo foto_url excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!diretor.foto_url){
                diretor.foto_url = null
            }
        else {
            return false
        }
}

module.exports = {
    listarTodosOsDiretores,
    listarDiretorPorId,
    criarDiretor,
    atualizarDiretor,
    deletarDiretor
}