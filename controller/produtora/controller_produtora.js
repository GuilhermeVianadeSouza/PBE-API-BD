/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados na tabela dublador;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const produtoraDAO = require('../../model/DAO/produtora.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosAsProdutoras = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultProdutora = await produtoraDAO.getSelectAllProducer()
                if(resultProdutora){
                    if(resultProdutora.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.produtora             =           resultProdutora
        
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

const listarProdutoraPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id) && id !='' && id !=null && id !=undefined && id > 0){
            let resultProdutora = await produtoraDAO.getSelectProducerById(id)
                if(resultProdutora){
                    if(resultProdutora.length > 0){
                        MESSAGES.DEFAULT_HEADER.status            =           MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code       =           MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.produtora             =           resultProdutora
        
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

const criarProdutora = async function (produtora, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {  
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosProdutora(produtora)

            if(!validar){
                let resultProdutora = await produtoraDAO.setInsertProducer(produtora)
                if(resultProdutora){
                    let lastID = await produtoraDAO.getSelectLastProducerId()
                    if(lastID){
                        produtora.id_produtora = lastID
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.produtora      =       produtora

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

const atualizarProdutora = async function(produtora, contentType, id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON')
            {
            let validar = await validarDadosProdutora(produtora)
            if(!validar) {
                let confirmarID = await listarProdutoraPorId(id)

                if (confirmarID.status_code == 200){
                    produtora.id_produtora = Number(id)

                    let atualizarDados = await produtoraDAO.setUpdateProducer(produtora)
                    if(atualizarDados) {
                        MESSAGES.DEFAULT_HEADER.status          =       MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     =       MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.produtora    =       produtora
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

const deletarProdutora = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let verificacaoID = await listarProdutoraPorId(id)
        if (verificacaoID.status_code == 200){
            id = Number(id)

            let excluirprodutora = await produtoraDAO.deleteProducer(id)
            if(excluirprodutora) {
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

const validarDadosProdutora = async function(produtora){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if(produtora.nome == '' || typeof produtora.nome != 'string' ||produtora.nome == undefined || produtora.nome == null || produtora.nome.length > 255){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Insira um nome valido.]'
            return MESSAGES.ERROR_REQUIRED_FIELDS}
        else if (!produtora.id_pais || isNaN(produtora.id_pais)){
            MESSAGES.ERROR_REQUIRED_FIELDS.message = 'O ID do país é obrigatório e deve ser um número.';
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
        else if(produtora.resumo_historia && produtora.resumo_historia.length > 65000){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Campo resumo_historia excedeu o limite de caracteres]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }if(!produtora.resumo_historia){
                produtora.resumo_historia = null
            }
        else if(produtora.data_fundacao) {
            const dataTeste = new Date(produtora.data_fundacao);
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
    listarTodosAsProdutoras,
    listarProdutoraPorId,
    criarProdutora,
    atualizarProdutora,
    deletarProdutora
}