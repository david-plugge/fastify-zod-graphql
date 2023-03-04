import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyAutoload from '@fastify/autoload';
import {
    jsonSchemaTransform,
    // createJsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';
import path from 'path';
import prisma from './prisma';

export default async (app: App.Fastify) => {
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
        dir: path.resolve(__dirname, '../modules'),
        matchFilter(path) {
            return path.endsWith('router.ts');
        },
    });
};
