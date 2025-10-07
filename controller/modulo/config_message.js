/***********************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelos padrões de mensagens que o projeto irá realizar, sempre no formato JSON(messagens de erro
 *          e Sucesso, etc.)
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 **********************************************************************************************************************************/

const dataAtual = new Date()

/**********************************************************MESSAGENS PADRONIZADAS *****************************************************************/
const MESSAGE_HEADER    =   { development: 'Guilherme Viana de Souza',
                                api_description: 'API para manipular dados de Filmes',
                                status: Boolean,
                                status_code: Number,
                                resquest_date: dataAtual.getTimezoneOffset().toString,
                                items: {}
                            }




/*********************************************************MESSAGENS DE SUCESSO *******************************************************************/
const MESSAGE_REQUEST_SUCCESS   =   {status: true,
                                    status_code: 200,
                                    message: 'Requisição bem sucedida!!!!'
                                    }


/**********************************************************MESSAGENS DE ERRO **********************************************************************/


module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCCESS
}