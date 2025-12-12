/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl_dublagem;
 * Data: 11/12/2025 - Data Inicio;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllDubbing = async function(){
    try {
        const sql = `select * from tbl_dublagem ORDER BY id_dublagem DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectDubbingById = async function(id){
    try {
        const sql = `select * from tbl_dublagem WHERE id_dublagem = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastDubbingId = async function(){
    try {
        let sql = `select id_dublagem from tbl_dublagem order by id_dublagem desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_dublagem)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertDubbing = async function (dublagem) {
    try{
        let tipo = dublagem.tipo_dublagem ? `'${dublagem.tipo_dublagem}'` : null

        let sql = `INSERT INTO tbl_dublagem(tipo_dublagem,
                    id_idioma, id_dublador, id_elenco)
                    VALUES ('${dublagem.tipo_dublagem}',
                            ${dublagem.id_idioma},
                            ${dublagem.id_dublador},
                            ${dublagem.id_elenco}
                            )`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return result
        else {
            return false
        }
    } catch(error){
        return false
    }
}



const setUpdateDubbing = async function (dublagem) {
    try {
        let sql = `update tbl_dublagem set
                    tipo_dublagem = '${dublagem.tipo_dublagem}',
                    id_idioma = ${dublagem.id_idioma},
                    id_dublador = ${dublagem.id_dublador},
                    id_elenco = ${dublagem.id_elenco}
                    
                    where id_dublagem = ${dublagem.id_dublagem};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteDubbing = async function(id){
    try {
        let sql = `delete from tbl_dublagem where id_dublagem = ${id}`

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
    getSelectAllDubbing,
    getSelectDubbingById,
    getSelectLastDubbingId,
    setInsertDubbing,
    setUpdateDubbing,
    deleteDubbing
}