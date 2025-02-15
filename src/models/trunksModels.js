import { PrismaClient } from '@prisma/client';
import cron from "node-cron";

import { cache } from "../utils/cache.js";
import { logger } from "../utils/logger.js";

import { generateUUID } from "../utils/handlers.js"
import { convertToISO } from "../utils/dateFunctions.js";

/**
 * 
 * Aqui ficará a lógica para manipular o banco de dados, que no caso é simplesmente um select sem limit, estou usando o prisma para facilitar e manter o código limpo, além de aprendizado.
 * 
 * A função getTrunks() é assíncrona, pois faz uma consulta ao banco de dados.
 * A função formatData é responsável por formatar os dados para o formato desejado.
 * 
 */

const prisma = new PrismaClient();

export const formatData = (trunk_data) => {
    return trunk_data.map((trunk) => {
        return {
            id: generateUUID(),
            trunk: trunk.channelid,
            lasy_sync: convertToISO(new Date())
        };
    });
}

export const fetchTrunks = async () => {
    const trunks = await prisma.trunks.findMany();
    logger.debug("Troncos localizados.");
    logger.debug("Formatando resultados...");

    const tunks_formated = formatData(trunks)
    logger.debug("Resultados formatados.");

    // Descomente caso queira ver os dados retornados do db do asterisk.
    // logger.debug(JSON.stringify(tunks_formated, null, 2));

    try {
        cache.set('trunks', tunks_formated);
        logger.info("Dados salvos no cache.");
        return tunks_formated;
    } catch (error) {
        logger.error(`Ocorreu um erro ao definir o cache ${error}`);
        return false;
    }
}

export const getTrunks = async () => {
    logger.debug("Buscando troncos...");
    const trunksCache = cache.get("trunks");

    if (!trunksCache) {
        try {
            return await fetchTrunks();
        } catch (error) {
            logger.erro(`Ocorreu um erro ao buscar os troncos ${error}`)
        }
    } else {
        logger.info("Dados encontrados no cache.");
        return trunksCache;
    }
}

cron.schedule('* * * * *', async () => await getTrunks());