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

// const

// const

// const

module.exports = {
    getSelectAllGenre
}