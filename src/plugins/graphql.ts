import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { buildSchema } from 'graphql';
import mercurius from 'mercurius';
import {
    codegenMercurius,
    CodegenMercuriusOptions,
    loadSchemaFiles,
} from 'mercurius-codegen';
import mercuriusAuth from 'mercurius-auth';
import mercuriusCache from 'mercurius-cache';
import mercuriusValidation from 'mercurius-validation';
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
            async onChange(schema) {
                app.graphql.replaceSchema(buildSchema(schema.join('\n')));
                app.graphql.defineResolvers(resolvers);

                codegenMercurius(app, codegenMercuriusOptions).catch(
                    console.error,
                );
            },
        },
    });

    await app.register(mercurius, {
        schema: `${mercuriusValidation.graphQLTypeDefs}\n\n${schema}`,
        resolvers,
        context: buildContext,
        graphiql: true,
        allowBatchedQueries: true,
        subscription: true,
    });

    if (app.env.dev) {
        codegenMercurius(app, codegenMercuriusOptions).catch(console.error);
    }

    app.register(mercuriusAuth, {
        authContext(context) {
            return {
                identity: context.reply.request.headers['x-user'],
            };
        },
        async applyPolicy(authDirectiveAST, parent, args, context, info) {
            return (context.auth ??= {}).identity === 'admin';
        },
        authDirective: 'auth',
    });
    app.register(mercuriusValidation);
    app.register(mercuriusCache, {
        policy: {},
    });
});
