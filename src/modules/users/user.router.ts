import { createUserHandler, listUsersHandler } from './user.handler';
import { createUserSchema, listUsersSchema } from './user.schema';

export default async function (app: App.Fastify) {
    app.route({
        url: '/',
        method: 'GET',
        schema: listUsersSchema,
        handler: listUsersHandler,
    });

    app.route({
        url: '/',
        method: 'POST',
        schema: createUserSchema,
        handler: createUserHandler,
    });
}

export const autoPrefix = '/users';
