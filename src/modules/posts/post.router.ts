import { createPostHandler, listPostsHandler } from './post.handler';
import { listPostsSchema, createPostSchema } from './post.schema';

export default async function (app: App.Fastify) {
    app.route({
        url: '/',
        method: 'GET',
        schema: listPostsSchema,
        handler: listPostsHandler,
    });

    app.route({
        url: '/',
        method: 'POST',
        schema: createPostSchema,
        handler: createPostHandler,
    });
}

export const autoPrefix = '/posts';
