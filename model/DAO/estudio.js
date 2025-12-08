/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl_estudio;
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

const getSelectAllStudio = async function(){
    try {
        const sql = `SELECT * FROM tbl_estudio ORDER BY id_estudio DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectStudioById = async function(id){
    try {
        const sql = `SELECT * FROM tbl_estudio WHERE id_estudio = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastStudioId = async function(){
    try {
        let sql = `select id_estudio from tbl_estudio order by id_estudio desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_estudio)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertStudio = async function (estudio) {
    try{
        let sql = `INSERT INTO tbl_estudio(nome, data_fundacao,
                    especialidade, id_pais)
                    VALUES ('${estudio.nome}',
                            ${validarData(estudio.data_fundacao)},
                            '${estudio.especialidade}',
                            '${estudio.id_pais}'
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



const setUpdateStudio = async function (estudio) {
    try {
        let sql = `update tbl_estudio set
                    nome = '${estudio.nome}',
                    data_fundacao = ${validarData(estudio.data_fundacao)},
                    especialidade = '${estudio.especialidade}',
                    id_pais = '${estudio.id_pais}'
                    
                    where id_estudio = ${estudio.id_estudio};`

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

const deleteStudio = async function(id){
    try {
        let sql = `delete from tbl_estudio where id_estudio = ${id}`

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
    getSelectAllStudio,
    getSelectStudioById,
    getSelectLastStudioId,
    setInsertStudio,
    setUpdateStudio,
    deleteStudio
}