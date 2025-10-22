/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao genero;
 * Data: 1/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllLanguage = async function(){
    try {
        let sql = `select * from tbl_idioma order by id_idioma desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else{
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectLanguageByID = async function (id){
    try {
        let sql = `select * from tbl_idioma where id_idioma=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setInsertLanguage = async function (language) {
    try{
        let sql = `INSERT INTO tbl_idioma (nome, 
                    sigla)
                    VALUES( '${idioma.nome}',
                    '${idioma.sigla}'
                    )`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else {
            return false
        }
    } catch(error){
        return false
    }
}

const setUpdateLanguage = async function (id) {}

const deleteLanguageByID = async function (id) {
    try {
        let sql = `delete from tbl_idioma where id_idioma=${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        console.log(result)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllLanguage,
    getSelectLanguageByID,
    setInsertLanguage,

    deleteLanguageByID
}