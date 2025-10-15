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
        Comandos para instalação:
        npm install prisma --save           -> Instalar o prisma (Conexão com o Database)
        npm install @prisma/client --save   -> Instalar o cliente do prisma (Executar scripts SQL no banco(BD))
        npx prisma init                     -> Prompt de comando para inicializar o prisma no projeto
        npx prisma migrate dev              -> Realiza o sincronismo entre o prisma e o bd (CUIDADO!!!!!!!,
                                            nesse processo você poderá perder dados reais do BD, pois
                                            ele pega e cria as tabelas programadas no ORM schema.prisma)
        npx prisma generate                 -> Apenas realiza o sincronismo entre o prisma e o BD, geralmente
                                            usamos para rodar o projeto em um PC novo.

        Knex      -> É uma dependencia atual, que trabalha com MySQL

    Banco de dados não relacionais:
        Mongoose  -> É uma dependencia para o Mongo DB (Não relacional)


        
*/

//Importe da dependencia do Prisma que permite a execução de script SQL no BD
//const {PrismaClient} = require(@prisma/client)
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

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

        if(Array.isArray(result))
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
    try { //Try: Coloque o código
        
        //Script SQL
        let sql = `select * from tbl_filme where id=${id}`

        //Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        // console.log(error)
        return false
    }
}

//Insere um filme novo no banco de dados
const setInsertMovies = async function(filme){
    try {
        let sql = `insert into tbl_filme (
                    nome, 
                    sinopse, 
                    data_lancamento, 
                    duracao, 
                    orcamento, 
                    trailer, 
                    capa)
                values (
                    '${filme.nome}', 
                    '${filme.sinopse}',
                    '${filme.data_lancamento}',
                    '${filme.duracao}',
                    '${filme.orcamento}',
                    '${filme.trailer}',
                    '${filme.capa}'
)`
        //ExecuteRawUnsafe(): Executar o script sql que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Altera um filme no banco de dados
const setUpdateMovies = async function(filme){
    try {
        let sql = `update tbl_filme set
                nome                ='${filme.nome}',
                sinopse             ='${filme.sinopse}',
                data_lancamento     ='${filme.data_lancamento}',
                duracao             ='${filme.duracao}',
                orcamento           ='${filme.orcamento}',
                trailer             ='${filme.trailer}',
                capa                ='${filme.capa}'
                
                where id = ${filme.id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

//Exclui um filme pelo ID no banco de dados
const setDeleteMovies = async function(id){
 try {
    let sql =   `delete from tbl_filme
                where id = ${id};`

    let result = await prisma.$executeRawUnsafe(sql)
    if(result)
        return true
    else
    return false
 } catch (error) {
    return false
 }
}

module.exports= {
    getSelectAllMovies,
    getSelectByIdMovies,
    setInsertMovies,
    setUpdateMovies,
    setDeleteMovies
}