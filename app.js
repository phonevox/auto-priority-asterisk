import Fastify from 'fastify';
import cors from '@fastify/cors';
import { trunksRoutes } from './src/routes/trunksRoutes.js';
import { priorityRoutes } from './src/routes/priorityRoutes.js';
import { logger } from './src/utils/logger.js';

const fastify = Fastify({ logger: true });

// Ativar CORS
fastify.register(cors, {
    origin: ['https://meusite.com', '192.1.1.1'], // Defina "*" para permitir qualquer origem ou liste domínios específicos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifique os métodos HTTP permitidos,
    allowedHeaders: ['Content-Type', 'Authorization'] // Especifica os cabeçalhos permitidos
});

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
