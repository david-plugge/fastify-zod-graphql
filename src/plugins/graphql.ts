import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { buildSchema } from 'graphql';
import mercurius, { MercuriusContext } from 'mercurius';
import {
    codegenMercurius,
    CodegenMercuriusOptions,
    loadSchemaFiles,
} from 'mercurius-codegen';
import resolvers from '../graphql/resolvers';

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
    return {
        authorization: req.headers.authorization,
        db: req.server.db,
    };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
    interface MercuriusContext
        extends PromiseType<ReturnType<typeof buildContext>> {}
}

export default fastifyPlugin(async (app) => {
    const codegenMercuriusOptions: CodegenMercuriusOptions = {
        targetPath: './src/graphql/generated.ts',
        operationsGlob: './src/graphql/operations/*.gql',
        watchOptions: {
            enabled: app.env.dev,
        },
    };

    const { schema } = loadSchemaFiles('src/graphql/schema/**/*.gql', {
        watchOptions: {
            enabled: app.env.dev,
            onChange(schema) {
                app.graphql.replaceSchema(buildSchema(schema.join('\n')));
                app.graphql.defineResolvers(resolvers);

                codegenMercurius(app, codegenMercuriusOptions).catch(
                    console.error,
                );
            },
        },
    });

    await app.register(mercurius, {
        schema,
        resolvers,
        context: buildContext,
        graphiql: true,
    });

    codegenMercurius(app, codegenMercuriusOptions).catch(console.error);
});
