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
        if
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}