/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl ator;
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

const getSelectAllActors = async function(){
    try {
        const sql = `SELECT * FROM tbl_ator ORDER BY id_ator DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectActorById = async function(id){
    try {
        const sql = `SELECT * FROM tbl_ator WHERE id_ator = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastActorId = async function(){
    try {
        let sql = `select id_ator from tbl_ator order by id_ator desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_ator)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertActor = async function (ator) {
    try{
        let sql = `INSERT INTO tbl_ator(nome, idade, nome_artistico, 
        biografia, altura_cm, data_nascimento, data_falecimento, 
        premio_destaque, foto_perfil_url, id_pais)
                    VALUES ('${ator.nome}',
                            '${ator.idade}',
                            '${ator.nome_artistico}',
                            '${ator.biografia}',
                            '${ator.altura_cm}',
                            ${validarData(ator.data_nascimento)},
                            ${validarData(ator.data_falecimento)},
                            '${ator.premio_destaque}',
                            '${ator.foto_perfil_url}',
                            '${ator.id_pais}'
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



const setUpdateActor = async function (ator) {
    try {
        let sql = `update tbl_ator set
                    nome = '${ator.nome}',
                    idade = '${ator.idade}',
                    nome_artistico = '${ator.nome_artistico}',
                    biografia = '${ator.biografia}',
                    altura_cm = '${ator.altura_cm}',
                    data_nascimento = ${validarData(ator.data_nascimento)},
                    data_falecimento = ${validarData(ator.data_falecimento)},
                    premio_destaque = '${ator.premio_destaque}',
                    foto_perfil_url = '${ator.foto_perfil_url}',
                    id_pais = '${ator.id_pais}'
                    
                    where id_ator = ${ator.id_ator};`

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

const deleteActor = async function(id){
    try {
        let sql = `delete from tbl_ator where id_ator = ${id}`

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
    getSelectAllActors,
    getSelectActorById,
    getSelectLastActorId,
    setInsertActor,
    setUpdateActor,
    deleteActor
}