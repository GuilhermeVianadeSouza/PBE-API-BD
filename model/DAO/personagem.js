/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela personagem;
 * Data: 08/12/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllCharacter = async function(){
    try{
        const sql = `SELECT * FROM tbl_personagem order by id_personagem desc`

        let result = prisma.$queryRawUnsafe(sql)
        if(result){
            return result
        } else {
            return false
        }
    } catch(error){
        return false
    }
}

const getSelectCharacterByID = async function(id){
    try{
        const sql = `SELECT * FROM tbl_personagem WHERE id_personagem = ${id}`

        let result = prisma.$queryRawUnsafe(sql)
        if(result){
            return result
        } else {
            return false
        }
    } catch(error){
        return false
    }
}

const getSelectLastCharacterId = async function () {
    try {
        let sql = `select id_personagem from tbl_personagem order by id_personagem desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_pais)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllCharacter,
    getSelectCharacterByID,
    getSelectLastCharacterId
}