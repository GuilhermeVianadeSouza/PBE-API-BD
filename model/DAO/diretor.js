/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl_diretor;
 * Data: 08/11/2025 - Data Inicio;
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

const getSelectAlldirector = async function(){
    try {
        const sql = `SELECT * FROM tbl_diretor ORDER BY id_diretor DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectDirectorById = async function(id){
    try {
        const sql = `SELECT * FROM tbl_diretor WHERE id_diretor = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastDirectorId = async function(){
    try {
        let sql = `select id_diretor from tbl_diretor order by id_diretor desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_diretor)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertDirector = async function (diretor) {
    try{
        let sql = `INSERT INTO tbl_diretor(nome,  data_nascimento, data_falecimento,
                    biografia, foto_url, id_pais)
                    VALUES ('${diretor.nome}',
                            ${validarData(diretor.data_nascimento)},
                            ${validarData(diretor.data_falecimento)},
                            '${diretor.biografia}',
                            '${diretor.foto_url}',
                            '${diretor.id_pais}'
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



const setUpdateDirector = async function (diretor) {
    try {
        let sql = `update tbl_diretor set
                    nome = '${diretor.nome}',
                    data_nascimento = ${validarData(diretor.data_nascimento)},
                    data_falecimento = ${validarData(diretor.data_falecimento)},
                    biografia = '${diretor.biografia}',
                    foto_url = '${diretor.foto_url}',
                    id_pais = '${diretor.id_pais}'
                    
                    where id_diretor = ${diretor.id_diretor};`

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

const deleteDirector = async function(id){
    try {
        let sql = `delete from tbl_diretor where id_diretor = ${id}`

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
    getSelectAlldirector,
    getSelectDirectorById,
    getSelectLastDirectorId,
    setInsertDirector,
    setUpdateDirector,
    deleteDirector
}