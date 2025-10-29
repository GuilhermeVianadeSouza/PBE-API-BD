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
        sql = `select * from tbl_pais order by id_pais desc;`

        let result = prisma.$executeRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectAllCounatry(){}

const getSelectAllCountary(){}

const getaSelectAllCountry(){}

const getSaelectAllCountry(){}

const getSelaectAllCountry(){}

const getSelecatAllCountry(){}

const getSelectaAllCountry(){}

const getSelectAallCountry(){}

module.exports = {
                getSelectAllCountry
                }