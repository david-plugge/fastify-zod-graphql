import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyAutoload from '@fastify/autoload';
import {
    jsonSchemaTransform,
    // createJsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';
import prisma from './plugins/prisma';
import graphql from './plugins/graphql';
import env from './plugins/env';

const app = fastify();

app.register(env);
app.register(graphql);

app.register(async (app) => {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'SampleApi',
                description: 'Sample backend service',
                version: '1.0.0',
            },
            servers: [],
        },
        transform: jsonSchemaTransform,
        // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
        //
        // transform: createJsonSchemaTransform({
        //   skipList: [ '/documentation/static/*' ]
        // })
    });

    app.register(fastifySwaggerUI, {
        routePrefix: '/documentation',
    });

    app.register(prisma);

    app.register(fastifyAutoload, {
        dir: __dirname + '/modules',
        matchFilter(path) {
            return path.endsWith('router.ts');
        },
    });
});

async function run() {
    await app.ready();

    await app.listen({
        port: 3000,
    });

    console.log(`Documentation running at http://localhost:3000/documentation`);
    console.log(`Graphql running at http://localhost:3000/graphiql`);
}

run();
