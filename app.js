import Fastify from 'fastify';
import { trunksRoutes } from './src/routes/trunksRoutes.js';
import { priorityRoutes } from './src/routes/priorityRoutes.js';

const fastify = Fastify({ logger: true });

// Registrar rotas 
fastify.register(trunksRoutes);
fastify.register(priorityRoutes);

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Servidor rodando em ${address}`);
});
