/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao filme;
 * Data: 1/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/
/*
    Exemplos de dependencias para conexão com o BD:
    Bancos de dados relacionais:
        Sequelize -> Tradicional/utilizada em mercado em vários projetos desde o inicio do node
        Prisma    -> É uma dependencia atual, que trabalha com o BD (MySQL, PostgreSQL, SQL Server) (SQL ou ORM)
        Knex      -> É uma dependencia atual, que trabalha com MySQL

    Banco de dados não relacionais:
        Mongoose  -> É uma dependencia para o Mongo DB (Não relacional)
*/

//Importe da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('@prisma/client')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient

//Se não devolve algum valor do banco utilize: $execute
    //A variavel é pega, enviada para o banco de dados, vai devolver um resultado. $execute
//O prisma tem 4 métodos de execução SQL, 2 métodos é para retorno do valor do banco. Os outros 2 é para por exemplo: Insert, Update, Delete
 //Função para utilizar um get e se utilizando do select dentro do banco de dados.

//Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function(){
    try { //Try: Coloque o código
        
        //Script SQL
        let sql = `select * from tbl_filme order by id desc`

        //Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(result.length > 0)
            return result
        else
            return false
    } catch (error) {
        // console.log(error)
        return false
    }
}

//Retorna um filme filtrando através do ID do banco de dados
const getSelectByIdMovies = async function(id){

}

//Insere um filme novo no banco de dados
const setInsertMovies = async function(){

}

//Altera um filme no banco de dados
const setUpdateMovies = async function(id){

}

//Exclui um filme pelo ID no banco de dados
const setDeleteMovies = async function(id){

}

module.exports= {
    getSelectAllMovies
}