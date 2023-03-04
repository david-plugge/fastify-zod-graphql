import fastifyPlugin from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        env: {
            dev: boolean;
        };
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: 'development' | 'production' | (string & {});
        }
    }
}

export default fastifyPlugin(async (app) => {
    app.env = {
        dev: process.env.NODE_ENV === 'development',
    };
});
