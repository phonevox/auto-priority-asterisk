import { logger } from '../utils/logger.js';

export const validateToken = async (request, reply) => {
    logger.info("test");

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({ message: "Token não fornecido" });
    }

    if (authHeader !== process.env.API_TOKEN) {
        return reply.status(401).send({ message: "Token inválido" });
    }
};
