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
import mercurius from 'mercurius';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const app = fastify();
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

app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
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
