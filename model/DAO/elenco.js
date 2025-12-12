/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl_elenco;
 * Data: 11/12/2025 - Data Inicio;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllCast = async function(){
    try {
        const sql = `select * from tbl_elenco ORDER BY id_elenco DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectCastById = async function(id){
    try {
        const sql = `select * from tbl_elenco WHERE id_elenco = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastCastId = async function(){
    try {
        let sql = `select id_elenco from tbl_elenco order by id_elenco desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_elenco)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertCast = async function (elenco) {
    try{
        let sql = `INSERT INTO tbl_elenco(tipo_atuacao, funcao_dramatica,
                    id_filme, id_personagem, id_ator)
                    VALUES ('${elenco.tipo_atuacao}',
                            '${elenco.funcao_dramatica}',
                            ${elenco.id_filme},
                            ${elenco.id_personagem},
                            ${elenco.id_ator}
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



const setUpdateCast = async function (elenco) {
    try {
        let sql = `update tbl_elenco set
                    tipo_atuacao = '${elenco.tipo_atuacao}',
                    funcao_dramatica = '${elenco.funcao_dramatica}',
                    id_filme = '${elenco.id_filme}',
                    id_personagem = ${elenco.id_personagem},
                    id_ator = '${elenco.id_ator}'
                    
                    where id_elenco = ${elenco.id_elenco};`

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

const deleteCast = async function(id){
    try {
        let sql = `delete from tbl_elenco where id_elenco = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result)
        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        
        return false
    }
}

module.exports = {
    getSelectAllCast,
    getSelectCastById,
    getSelectLastCastId,
    setInsertCast,
    setUpdateCast,
    deleteCast
}