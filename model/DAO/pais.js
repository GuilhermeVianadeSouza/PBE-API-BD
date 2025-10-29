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

// const getSelectAllCountary(){}

// const getaSelectAllCountry(){}

// const getSaelectAllCountry(){}

// const getSelaectAllCountry(){}

// const getSelecatAllCountry(){}

// const getSelectaAllCountry=(){}

const deleteCountry = async function(id){
    try {
        let sql = `delete from tbl_pais where id_pais = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

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
                getSelectCountrybyID
                }