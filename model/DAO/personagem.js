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

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
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

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
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
            return Number(result[0].id_personagem)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const setInsertCharacter = async function(personagem){
    try {
        let sql = `INSERT INTO tbl_personagem (nome, codinome, descricao, historia_origem, foto_url, ocupacao)
        VALUES(
        '${personagem.nome}',
        '${personagem.codinome}',
        '${personagem.descricao}',
        '${personagem.historia_origem}',
        '${personagem.foto_url}',
        '${personagem.ocupacao}'
        )`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateCharacter = async function(personagem){
    try {
        let sql = `UPDATE tbl_personagem SET
        nome = '${personagem.nome}',
        codinome = '${personagem.codinome}',
        descricao = '${personagem.descricao}',
        historia_origem = '${personagem.historia_origem}',
        foto_url = '${personagem.foto_url}',
        ocupacao = '${personagem.ocupacao}'
        
        WHERE id_personagem = ${personagem.id_personagem}`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteCharacter = async function(id){
    try {
        let sql = `DELETE FROM tbl_personagem WHERE id_personagem = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result
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
    getSelectLastCharacterId,
    setInsertCharacter,
    setUpdateCharacter,
    deleteCharacter
}