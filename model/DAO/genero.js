/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao genero;
 * Data: 1/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllGenre = async function (){
    try{
        let sql = `select * from tbl_genero order by id_genero desc`

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

const getSelectGenreByID = async function (id){
    try {
        let sql = `select * from tbl_genero where id_genero = ${id}`
        
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

const getSelectLastGenreByID = async function(id) {
    try {
        let sql = `select id_genero from tbl_genero order by id_genero desc limit 1`

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

const setInsertGenre = async function (genero) {
    try {
        let sql = `insert into tbl_genero (nome)
                    values (${genero.nome})`
        
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

const setUpdateGenre = async function (genero) {
    try {
        let sql = `update into tbl_genero set nome = '${genero.nome}'`

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

const deleteGenre = async function (id){
    try {
        let sql = `delete from tbl_genero where id_genero = ${id}`

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
    getSelectAllGenre,
    getSelectGenreByID,
    getSelectLastGenreByID,
    setInsertGenre,
    setUpdateGenre, 
    deleteGenre
}