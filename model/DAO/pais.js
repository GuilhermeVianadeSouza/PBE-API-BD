/******************************************************************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao genero;
 * Data: 1/10/2025;
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 ******************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllCountry = async function(){
    try {
        let sql = `select * from tbl_pais order by id_pais desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectCountrybyID = async function(id){
    try {
        let sql = `select * from tbl_pais where id_pais = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectLastCountryId = async function () {
    try {
        let sql = `select id_pais from tbl_pais order by id_pais desc limit 1`

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

const setInsertCountry = async function (pais) {
    try{
        let sql = `INSERT INTO tbl_pais(nome, sigla, nacionalidade)
                    VALUES ('${pais.nome}',
                            '${pais.sigla}',
                            '${pais.nacionalidade}'
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



const setUpdateCountry = async function (pais) {
    try {
        let sql = `update tbl_pais set
                    nome = '${pais.nome}',
                    sigla = '${pais.sigla}',
                    nacionalidade = '${pais.nacionalidade}'
                    
                    where id_pais = ${pais.id_pais};`

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

const deleteCountry = async function(id){
    try {
        let sql = `delete from tbl_pais where id_pais = ${id}`

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
                getSelectAllCountry,
                getSelectCountrybyID,
                getSelectLastCountryId,
                setInsertCountry,
                setUpdateCountry,
                deleteCountry,
                }