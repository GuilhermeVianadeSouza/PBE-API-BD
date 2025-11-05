/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao relacionamento entre filme e Genero;
 * Data: 05/11/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/



const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//listar todos os filmes e generos do banco de dados
const getSelectAllMoviesGenre = async function (){
    try{
        
        let sql = `select * from tbl_filme_genero order by id desc`

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

const getSelectGenreMoviesByID = async function (id){
    try {
        let sql = `select * from tbl_filme_genero where id = ${id}`
        
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

//RETORNA UMA LISTA DE GENEROS FILTRANDO PELO ID DO FILME.
const getSelectGenresByIdMovies = async function (id_filme){
    try {
        let sql = `select tbl_genero.id_genero, tbl_genero.nome 
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme 
                            inner join tbl_genero
                                on tbl_genero.id_genero = tbl_filme_genero.id_genero
                        where tbl_filme.id = ${id_filme}`

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

const getSelectMoviesByIdGenres = async function (id_genero){
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome, tbl_filme.sinopse 
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme 
                            inner join tbl_genero
                                on tbl_genero.id_genero = tbl_filme_genero.id_genero
                        where tbl_genero.id_genero = ${id_genero}`
        
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

const getSelectLastGenreByID = async function() {
    try {
        let sql = `select id from tbl_filme_genero order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)){
            return Number(result[0].id_genero)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setInsertMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `insert into tbl_filme_genero (id_filme, id_genero)
                    values (${filmeGenero.id_filme}, ${filmeGenero.id_genero})`
        
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

const setUpdateMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `update tbl_filme_genero set 
                        id_filme = ${filmeGenero.id_filme},
                        id_genero = ${filmeGenero.id_genero}
        
                    where id = ${filmeGenero.id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (result){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setdeleteMoviesGenres = async function (id){
    try {
        let sql = `delete from tbl_filme_genero where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
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
    getSelectAllMoviesGenre,
    getSelectGenreMoviesByID,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenres,
    getSelectLastGenreByID,
    setInsertMoviesGenres,
    setUpdateMoviesGenres, 
    setdeleteMoviesGenres
}