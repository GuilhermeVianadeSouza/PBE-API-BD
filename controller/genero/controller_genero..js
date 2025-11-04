/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de filme;
 * Data: 04/11/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const generoDAO = require('../../model/DAO/genero.js')

const DEFAULT_MESSAGES = require('../modulo/config_message.js')

const listarTodosOsGeneros = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultGenero = await generoDAO.getSelectAllGenre()
        if(resultGenero){
            if(resultGenero.length > 0){
                MESSAGES.DEFAULT_HEADER.status              =       MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code         =       MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.genero        =       resultGenero

                console.log(MESSAGES.DEFAULT_HEADER)
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarGeneroPorID = async function(id){

}

module.exports = {
    listarTodosOsGeneros
}