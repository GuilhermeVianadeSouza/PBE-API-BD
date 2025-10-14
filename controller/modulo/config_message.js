/***********************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelos padrões de mensagens que o projeto irá realizar, sempre no formato JSON(messagens de erro
 *          e Sucesso, etc.)
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 **********************************************************************************************************************************/

const dataAtual = new Date()

/**********************************************************MESSAGENS PADRONIZADAS *****************************************************************/
const DEFAULT_HEADER    =   { development: 'Guilherme Viana de Souza',
                                api_description: 'API para manipular dados de Filmes',
                                status: Boolean,
                                status_code: Number,
                                resquest_date: dataAtual.toLocaleString(), //toString()
                                items: {}
                            }




/*********************************************************MESSAGENS DE SUCESSO *******************************************************************/
const SUCESS_REQUEST        =   {status: true,
                                    status_code: 200,
                                    message: 'Requisição bem sucedida!!!!'
                                }

const SUCESS_CREATED_ITEM   =  {status: true,
                                status_code: 201,
                                message: 'Item criado com sucesso!!!'
                                }

/**********************************************************MESSAGENS DE ERRO **********************************************************************/

const ERROR_NOT_FOUND   =                   {status: false,
                                            status_code: 404,
                                            message: 'Não foram encontrados dados de retorno!!!'
                                            }

const ERROR_INTERNAL_SERVER_MODEL   =       {status: false,
                                            status_code: 500,
                                            message: 'Não foi possível processar a requisição devido a erros internos no servidor (MODELAGEM DE DADOS)!!!'
                                            }

const ERROR_INTERNAL_SERVER_CONTROLLER   =  {status: false,
                                            status_code: 500,
                                            message: 'Não foi possível processar a requisição devido a erros internos no servidor (CONTROLLER)!!!'
                                            }

const ERROR_REQUIRED_FIELDS     =           {status: false,
                                            status_code: 400,
                                            message: 'Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme a documentação.'
                                            }

const ERROR_CONTENT_TYPE     =              {status: false,
                                            status_code: 415,
                                            message: 'Não foi possível processar a requisição, pois o tipo de dados enviado no corpo deve ser JSON !!!'
                                            }

module.exports = {
    DEFAULT_HEADER,
    SUCESS_REQUEST,
    SUCESS_CREATED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE
}