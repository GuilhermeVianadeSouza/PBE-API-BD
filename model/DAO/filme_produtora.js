/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao relacionamento entre filme e Produtora;
 * Data: 11/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/



const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()


const getSelectAllMoviesProducer = async function (){
    try{
        
        let sql = `select * from tbl_produtora_filme order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return result
        } else
        return false
    }
    catch(error){
        return false
    }
}

const getSelectProducerMoviesByID = async function (id){
    try {
        let sql = `select * from tbl_produtora_filme where id = ${id}`
        
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const getSelectProducerByIdMovies = async function (id_filme){
    try {
        let sql = `select tbl_produtora.id_produtora, tbl_produtora.nome 
                        from tbl_filme
                            inner join tbl_produtora_filme
                                on tbl_filme.id_filme = tbl_produtora_filme.id_filme 
                            inner join tbl_produtora
                                on tbl_produtora.id_produtora = tbl_produtora_filme.id_produtora
                        where tbl_filme.id_filme = ${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectMoviesByIdProducer = async function (id_produtora){
    try {
        let sql = `select tbl_filme.id_filme, tbl_filme.nome, tbl_filme.sinopse 
                        from tbl_filme
                            inner join tbl_produtora_filme
                                on tbl_filme.id_filme = tbl_produtora_filme.id_filme 
                            inner join tbl_produtora
                                on tbl_produtora.id_produtora = tbl_produtora_filme.id_produtora
                        where tbl_produtora.id_produtora = ${id_produtora}`
        
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectLastProducerMovieId = async function() {
    try {
        let sql = `select id from tbl_produtora_filme order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setInsertMoviesProducer = async function (filmeProdutora) {
    try {
        let tipoCreditoSQL = filmeProdutora.tipo_participacao 
            ? `'${filmeProdutora.tipo_participacao}'` 
            : 'NULL';

            let produtoraPrincipalSQL = filmeProdutora.produtora_principal ? 1 : 0; 

        if (filmeProdutora.produtora_principal === undefined) {
             produtoraPrincipalSQL = 1; 
        }
        
        let sql = `insert into tbl_produtora_filme (
                        id_filme, 
                        id_produtora, 
                        tipo_participacao, 
                        produtora_principal
                   ) values (
                        ${filmeProdutora.id_filme}, 
                        ${filmeProdutora.id_produtora},
                        ${tipoCreditoSQL}, 
                        ${produtoraPrincipalSQL}
                   )`
        
        let result = await prisma.$executeRawUnsafe(sql)
        if (result){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setUpdateMoviesProducer = async function (filmeProdutora) {
    try {
        let tipoParticipacaoSQL = filmeProdutora.tipo_participacao 
            ? `'${filmeProdutora.tipo_participacao}'` 
            : 'NULL';

        let produtoraPrincipalSQL = filmeProdutora.produtora_principal ? 1 : 0;

        let sql = `update tbl_produtora_filme set 
                        id_filme = ${filmeProdutora.id_filme},
                        tipo_participacao = ${tipoParticipacaoSQL},
                        produtora_principal = ${produtoraPrincipalSQL},
                        id_produtora = ${filmeProdutora.id_produtora}
        
                    where id = ${filmeProdutora.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setDeleteMoviesProducer = async function (id){
    try {
        let sql = `delete from tbl_produtora_filme where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setDeleteMoviesProducerByIdMovies = async function (id){
    try {
        let sql = `delete from tbl_produtora_filme where id_filme = ${id}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setDeleteMoviesProducerByIdProducer = async function(id){
    try {
        let sql = `delete from tbl_produtora_filme where id_produtora = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMoviesProducer,
    getSelectProducerMoviesByID,
    getSelectProducerByIdMovies,
    getSelectMoviesByIdProducer,
    getSelectLastProducerMovieId,
    setInsertMoviesProducer,
    setUpdateMoviesProducer,
    setDeleteMoviesProducer,
    setDeleteMoviesProducerByIdMovies,
    setDeleteMoviesProducerByIdProducer
}