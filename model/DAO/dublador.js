/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente a tabela tbl_dublador;
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

const getSelectAllVoiceActor = async function(){
    try {
        const sql = `SELECT * FROM tbl_dublador ORDER BY id_dublador DESC`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectVoiceActorById = async function(id){
    try {
        const sql = `SELECT * FROM tbl_dublador WHERE id_dublador = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastVoiceActorId = async function(){
    try {
        let sql = `select id_dublador from tbl_dublador order by id_dublador desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id_dublador)
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const setInsertVoiceActor = async function (dublador) {
    try{
        let sql = `INSERT INTO tbl_dublador(nome,  data_nascimento, data_falecimento,
                    biografia, estudio_principal, ativo, id_pais)
                    VALUES ('${dublador.nome}',
                            ${validarData(dublador.data_nascimento)},
                            ${validarData(dublador.data_falecimento)},
                            '${dublador.biografia}',
                            '${dublador.estudio_principal}',
                            ${dublador.ativo},
                            '${dublador.id_pais}'
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



const setUpdateVoiceActor = async function (dublador) {
    try {
        let sql = `update tbl_dublador set
                    nome = '${dublador.nome}',
                    data_nascimento = ${validarData(dublador.data_nascimento)},
                    data_falecimento = ${validarData(dublador.data_falecimento)},
                    biografia = '${dublador.biografia}',
                    estudio_principal = '${dublador.estudio_principal}',
                    ativo = ${dublador.ativo},
                    id_pais = '${dublador.id_pais}'
                    
                    where id_dublador = ${dublador.id_dublador};`

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

const deleteVoiceActor = async function(id){
    try {
        let sql = `delete from tbl_dublador where id_dublador = ${id}`

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
    getSelectAllVoiceActor,
    getSelectVoiceActorById,
    getSelectLastVoiceActorId,
    setInsertVoiceActor,
    setUpdateVoiceActor,
    deleteVoiceActor
}