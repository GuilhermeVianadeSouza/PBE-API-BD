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

const getSelectLastLanguageId = async function () {
    try {
        let sql = `select id_idioma from tbl_idioma order by id_idioma desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_idioma)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setInsertLanguage = async function (idioma) {
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

const setUpdateLanguage = async function (idioma) {
    try {
        let sql = `update tbl_idioma set
                    nome = '${idioma.nome}',
                    sigla = '${idioma.sigla}' 

                    where id_idioma = ${idioma.id_idioma};`

        let result = await prisma.$queryRawUnsafe(sql)
        if (result){
            console.log(result)
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteLanguageByID = async function (id) {
    try {
        let sql = `delete from tbl_idioma where id_idioma=${id}`

        let result = await prisma.$queryRawUnsafe(sql)
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
    getSelectLastLanguageId,
    setInsertLanguage,
    setUpdateLanguage,
    deleteLanguageByID
}