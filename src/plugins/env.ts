import fastifyPlugin from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        env: {
            dev: boolean;
        };
    }
}

export default fastifyPlugin(async (app) => {
    app.env = {
        dev: true,
    };
});
