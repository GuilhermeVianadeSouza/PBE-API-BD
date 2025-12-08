/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl_roterista;
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

const getSelectAllScreenwriter = async function(){
    try {
        const sql = `SELECT * FROM tbl_roterista ORDER BY id_roterista DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectScreenwriterById = async function(id){
    try {
        const sql = `SELECT * FROM tbl_roterista WHERE id_roterista = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastScreenwriterId = async function(){
    try {
        let sql = `select id_roterista from tbl_roterista order by id_roterista desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_roterista)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertScreenwriter = async function (roterista) {
    try{
        let sql = `INSERT INTO tbl_roterista(nome, mini_bio,  data_nascimento, data_falecimento,
                    biografia, ativo, id_pais)
                    VALUES ('${roterista.nome}',
                            '${roterista.mini_bio}',
                            ${validarData(roterista.data_nascimento)},
                            ${validarData(roterista.data_falecimento)},
                            '${roterista.biografia}',
                            ${roterista.ativo},
                            '${roterista.id_pais}'
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



const setUpdateScreenwriter = async function (roterista) {
    try {
        let sql = `update tbl_roterista set
                    nome = '${roterista.nome}',
                    mini_bio = '${roterista.mini_bio}',
                    data_nascimento = ${validarData(roterista.data_nascimento)},
                    data_falecimento = ${validarData(roterista.data_falecimento)},
                    biografia = '${roterista.biografia}',
                    ativo = ${roterista.ativo},
                    id_pais = '${roterista.id_pais}'
                    
                    where id_roterista = ${roterista.id_roterista};`

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

const deleteScreenwriter = async function(id){
    try {
        let sql = `delete from tbl_roterista where id_roterista = ${id}`

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
    getSelectAllScreenwriter,
    getSelectScreenwriterById,
    getSelectLastScreenwriterId,
    setInsertScreenwriter,
    setUpdateScreenwriter,
    deleteScreenwriter
}