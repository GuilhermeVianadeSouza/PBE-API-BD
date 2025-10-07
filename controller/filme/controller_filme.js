/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de filme;
 * Data: 07/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

//Import da model do DAO do filme;
const filmeDAO = require('../../model/DAO/filme.js')
//Import do arquivo de mensagens padronizadas
const MESSAGES = require('../modulo/config_message.js')


//retorna uma lista de todos os filmes
const listarFilmes = async function(){
    //Chama a função do DAO para retorna a lista de filmes do BD
    let resultFilmes = await filmeDAO.getSelectAllMovies()
    console.log(resultFilmes)
    if (resultFilmes){
        if (resultFilmes.length > 0) {
            MESSAGES.MESSAGE_HEADER.status      = MESSAGES.MESSAGE_REQUEST_SUCCESS.status
            MESSAGES.MESSAGE_HEADER.status_code = MESSAGES.MESSAGE_REQUEST_SUCCESS.status_code
            MESSAGES.MESSAGE_HEADER.items.filmes = resultFilmes

            return MESSAGES.MESSAGE_HEADER
        }
    }

}

//Retorna um filme filtrando pelo ID
const buscarFilmesId = async function(id){
    
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
}