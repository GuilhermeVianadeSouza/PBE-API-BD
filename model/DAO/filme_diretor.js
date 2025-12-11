/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao relacionamento entre filme e Diretor;
 * Data: 05/11/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/



const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//listar todos os filmes e generos do banco de dados
const getSelectAllMoviesDirector = async function (){
    try{
        
        let sql = `select * from tbl_diretor_filme order by id desc`

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

const getSelectDirectorMoviesByID = async function (id){
    try {
        let sql = `select * from tbl_diretor_filme where id = ${id}`
        
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


const getSelectDirectorsByIdMovies = async function (id_filme){
    try {
        let sql = `select tbl_diretor.id_diretor, tbl_diretor.nome 
                        from tbl_filme
                            inner join tbl_diretor_filme
                                on tbl_filme.id_filme = tbl_diretor_filme.id_filme 
                            inner join tbl_diretor
                                on tbl_diretor.id_diretor = tbl_diretor_filme.id_diretor
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

const getSelectMoviesByIdDirector = async function (id_diretor){
    try {
        let sql = `select tbl_filme.id_filme, tbl_filme.nome, tbl_filme.sinopse 
                        from tbl_filme
                            inner join tbl_diretor_filme
                                on tbl_filme.id_filme = tbl_diretor_filme.id_filme 
                            inner join tbl_diretor
                                on tbl_diretor.id_diretor = tbl_diretor_filme.id_diretor
                        where tbl_diretor.id_diretor = ${id_diretor}`
        
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

const getSelectLastDirectorGenreId = async function() {
    try {
        let sql = `select id from tbl_diretor_filme order by id desc limit 1`

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

const setInsertMoviesDirector = async function (filmeDiretor) {
    try {
        let sql = `insert into tbl_diretor_filme (id_filme, tipo_direcao, id_diretor)
                    values (${filmeDiretor.id_filme}, '${filmeDiretor.tipo_direcao}', ${filmeDiretor.id_diretor})`
        
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

const setUpdateMoviesDirector = async function (filmeDiretor) {
    try {
        let sql = `update tbl_diretor_filme set 
                        id_filme = ${filmeDiretor.id_filme},
                        tipo_direcao = '${filmeDiretor.tipo_direcao}',
                        id_diretor = ${filmeDiretor.id_diretor}
        
                    where id = ${filmeDiretor.id}`

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

const setDeleteMoviesDirector = async function (id){
    try {
        let sql = `delete from tbl_diretor_filme where id = ${id}`

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

const setDeleteMoviesDirectorsByIdMovies = async function (id){
    try {
        let sql = `delete from tbl_diretor_filme where id_filme = ${id}`
        
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

const setDeleteMoviesDirectorsByIdDirector = async function(id){
    try {
        let sql = `delete from tbl_diretor_filme where id_diretor = ${id}`

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
    getSelectAllMoviesDirector,
    getSelectDirectorMoviesByID,
    getSelectDirectorsByIdMovies,
    getSelectLastDirectorGenreId,
    getSelectMoviesByIdDirector,
    setInsertMoviesDirector,
    setUpdateMoviesDirector,
    setDeleteMoviesDirector,
    setDeleteMoviesDirectorsByIdDirector,
    setDeleteMoviesDirectorsByIdMovies
}