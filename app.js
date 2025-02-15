import Fastify from 'fastify';
import { trunksRoutes } from './src/routes/trunksRoutes.js';
import { priorityRoutes } from './src/routes/priorityRoutes.js';
import { logger } from './src/utils/logger.js';
import { validateToken } from './src/middlewares/validateToken.js';

const fastify = Fastify({ logger: true });

// Usando o middleware globalmente
// fastify.addHook('onRequest', validateToken);

// Registrar rotas 
fastify.register(trunksRoutes);
fastify.register(priorityRoutes);

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    logger.info(`🚀 Servidor rodando em ${address}`);
});
