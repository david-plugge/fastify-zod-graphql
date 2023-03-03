import fastifyPlugin from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
    interface FastifyInstance {
        db: PrismaClient;
    }
}

export const db = new PrismaClient();

export default fastifyPlugin(async (app) => {
    app.db = db;

    app.addHook('onClose', async (app) => {
        await app.db.$disconnect();
    });
});
