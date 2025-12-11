/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao relacionamento entre filme e Roterista;
 * Data: 11/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/



const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()


const getSelectAllMoviesScreenwriter = async function (){
    try{
        
        let sql = `select * from tbl_roterista_filme order by id desc`

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

const getSelectScreenwriterMoviesByID = async function (id){
    try {
        let sql = `select * from tbl_roterista_filme where id = ${id}`
        
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


const getSelectScreenwriterByIdMovies = async function (id_filme){
    try {
        let sql = `select tbl_roterista.id_roterista, tbl_roterista.nome 
                        from tbl_filme
                            inner join tbl_roterista_filme
                                on tbl_filme.id_filme = tbl_roterista_filme.id_filme 
                            inner join tbl_roterista
                                on tbl_roterista.id_roterista = tbl_roterista_filme.id_roterista
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

const getSelectMoviesByIdScreenwriter = async function (id_roterista){
    try {
        let sql = `select tbl_filme.id_filme, tbl_filme.nome, tbl_filme.sinopse 
                        from tbl_filme
                            inner join tbl_roterista_filme
                                on tbl_filme.id_filme = tbl_roterista_filme.id_filme 
                            inner join tbl_roterista
                                on tbl_roterista.id_roterista = tbl_roterista_filme.id_roterista
                        where tbl_roterista.id_roterista = ${id_roterista}`
        
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

const getSelectLastScreenwriterMovieId = async function() {
    try {
        let sql = `select id from tbl_roterista_filme order by id desc limit 1`

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

const setInsertMoviesScreenwriter = async function (filmeRoterista) {
    try {
        let tipoCreditoSQL = filmeRoterista.tipo_credito 
            ? `'${filmeRoterista.tipo_credito}'` 
            : 'NULL';

        let detalheAdaptacaoSQL = filmeRoterista.detalhe_adaptacao 
            ? `'${filmeRoterista.detalhe_adaptacao}'` 
            : 'NULL';
        
        let sql = `insert into tbl_roterista_filme (
                        id_filme, 
                        id_roterista, 
                        tipo_credito, 
                        detalhe_adaptacao
                   ) values (
                        ${filmeRoterista.id_filme}, 
                        ${filmeRoterista.id_roterista},
                        ${tipoCreditoSQL}, 
                        ${detalheAdaptacaoSQL}
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

const setUpdateMoviesScreenwriter = async function (filmeRoterista) {
    try {
        let sql = `update tbl_roterista_filme set 
                        id_filme = ${filmeRoterista.id_filme},
                        tipo_credito = '${filmeRoterista.tipo_credito}',
                        detalhe_adaptacao = '${filmeRoterista.detalhe_adaptacao}',
                        id_roterista = ${filmeRoterista.id_roterista}
        
                    where id = ${filmeRoterista.id}`

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

const setDeleteMoviesScreenwriter = async function (id){
    try {
        let sql = `delete from tbl_roterista_filme where id = ${id}`

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

const setDeleteMoviesScreenwriterByIdMovies = async function (id){
    try {
        let sql = `delete from tbl_roterista_filme where id_filme = ${id}`
        
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

const setDeleteMoviesScreenwriterByIdScreenwriter = async function(id){
    try {
        let sql = `delete from tbl_roterista_filme where id_roterista = ${id}`

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
    getSelectAllMoviesScreenwriter,
    getSelectScreenwriterMoviesByID,
    getSelectScreenwriterByIdMovies,
    getSelectLastScreenwriterMovieId,
    getSelectMoviesByIdScreenwriter,
    setInsertMoviesScreenwriter,
    setUpdateMoviesScreenwriter,
    setDeleteMoviesScreenwriter,
    setDeleteMoviesScreenwriterByIdMovies,
    setDeleteMoviesScreenwriterByIdScreenwriter
}