/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao relacionamento entre filme e Estudio;
 * Data: 11/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/



const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()


const getSelectAllMoviesStudio = async function (){
    try{
        
        let sql = `select * from tbl_estudio_filme order by id desc`

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

const getSelectStudioMoviesByID = async function (id){
    try {
        let sql = `select * from tbl_estudio_filme where id = ${id}`
        
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


const getSelectStudioByIdMovies = async function (id_filme){
    try {
        let sql = `select tbl_estudio.id_estudio, tbl_estudio.nome 
                        from tbl_filme
                            inner join tbl_estudio_filme
                                on tbl_filme.id_filme = tbl_estudio_filme.id_filme 
                            inner join tbl_estudio
                                on tbl_estudio.id_estudio = tbl_estudio_filme.id_estudio
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

const getSelectMoviesByIdStudio = async function (id_estudio){
    try {
        let sql = `select tbl_filme.id_filme, tbl_filme.nome, tbl_filme.sinopse 
                        from tbl_filme
                            inner join tbl_estudio_filme
                                on tbl_filme.id_filme = tbl_estudio_filme.id_filme 
                            inner join tbl_estudio
                                on tbl_estudio.id_estudio = tbl_estudio_filme.id_estudio
                        where tbl_estudio.id_estudio = ${id_estudio}`
        
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

const getSelectLastStudioMovieId = async function() {
    try {
        let sql = `select id from tbl_estudio_filme order by id desc limit 1`

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

const setInsertMoviesStudio = async function (filmeEstudio) {
    try {
        let sql = `insert into tbl_estudio_filme (
                        id_filme, 
                        id_estudio, 
                        tipo_associacao 
                   ) values (
                        ${filmeEstudio.id_filme}, 
                        ${filmeEstudio.id_estudio},
                        '${filmeEstudio.tipo_associacao}'
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

const setUpdateMoviesStudio = async function (filmeEstudio) {
    try {           
            let sql = `update tbl_estudio_filme set 
                        id_filme = ${filmeEstudio.id_filme},
                        tipo_associacao = '${filmeEstudio.tipo_associacao}',
                        id_estudio = ${filmeEstudio.id_estudio}
        
                    where id = ${filmeEstudio.id}`

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

const setDeleteMoviesStudio = async function (id){
    try {
        let sql = `delete from tbl_estudio_filme where id = ${id}`

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

const setDeleteMoviesStudioByIdMovies = async function (id){
    try {
        let sql = `delete from tbl_estudio_filme where id_filme = ${id}`
        
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

const setDeleteMoviesStudioByIdStudio = async function(id){
    try {
        let sql = `delete from tbl_estudio_filme where id_estudio = ${id}`

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
    getSelectAllMoviesStudio,
    getSelectStudioMoviesByID,
    getSelectStudioByIdMovies,
    getSelectMoviesByIdStudio,
    getSelectLastStudioMovieId,
    setInsertMoviesStudio,
    setUpdateMoviesStudio,
    setDeleteMoviesStudio,
    setDeleteMoviesStudioByIdMovies,
    setDeleteMoviesStudioByIdStudio
}