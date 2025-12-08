/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl_produtora;
 * Data: 08/12/2025 - Data Inicio;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

function validarData(data) {
    if (!data || data === '') {
        return 'NULL';
    }
    return `'${data}'`;
}

const getSelectAllProducer = async function(){
    try {
        const sql = `SELECT * FROM tbl_produtora ORDER BY id_produtora DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectProducerById = async function(id){
    try {
        const sql = `SELECT * FROM tbl_produtora WHERE id_produtora = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastProducerId = async function(){
    try {
        let sql = `select id_produtora from tbl_produtora order by id_produtora desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_produtora)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertProducer = async function (produtora) {
    try{
        let sql = `INSERT INTO tbl_produtora(nome, data_fundacao,
                    resumo_historia, id_pais)
                    VALUES ('${produtora.nome}',
                            ${validarData(produtora.data_fundacao)},
                            '${produtora.resumo_historia}',
                            '${produtora.id_pais}'
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



const setUpdateProducer = async function (produtora) {
    try {
        let sql = `update tbl_produtora set
                    nome = '${produtora.nome}',
                    data_fundacao = ${validarData(produtora.data_fundacao)},
                    resumo_historia = '${produtora.resumo_historia}',
                    id_pais = '${produtora.id_pais}'
                    
                    where id_produtora = ${produtora.id_produtora};`

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

const deleteProducer = async function(id){
    try {
        let sql = `delete from tbl_produtora where id_produtora = ${id}`

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
    getSelectAllProducer,
    getSelectProducerById,
    getSelectLastProducerId,
    setInsertProducer,
    setUpdateProducer,
    deleteProducer
}