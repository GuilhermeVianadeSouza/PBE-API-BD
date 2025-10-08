/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de filme;
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

//Import da model do DAO do filme;
const filmeDAO = require('../../model/DAO/filme.js')
//Import do arquivo de mensagens padronizadas
const DEFAULT_MESSAGES = require('../modulo/config_message.js')


//retorna uma lista de todos os filmes
const listarFilmes = async function(){
let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try{//Criando um objeto novo para as mensagens
        //Chama a função do DAO para retorna a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()
        if (resultFilmes){
            if (resultFilmes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes
    
                return MESSAGES.DEFAULT_HEADER //200
            } else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna um filme filtrando pelo ID
const buscarFilmesId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Validação da chegada do ID
        if(!isNaN(id)){
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if(resultFilmes){
                if(resultFilmes.length > 0){
                    MESSAGES.DEFAULT_HEADER.status  = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER //200
                } else{
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL// 500
            }
        } else{
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um filme
const inserirFilme = async function(filme){
    
}

//Atualiza um filme filtrando pelo ID
const atualizarFilme = async function(filme, id){
    
}

//Exclui um filme filtrando pelo ID
const excluirFilme = async function(id){

}

module.exports = {
    listarFilmes,
    buscarFilmesId,
}