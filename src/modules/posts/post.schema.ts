import { FastifySchema } from 'fastify';
import { z } from 'zod';

export const listPostsSchema = {
    response: {
        200: z.array(
            z.object({
                id: z.string(),
                title: z.string(),
                body: z.string(),
                owner: z.string(),
            }),
        ),
    },
} satisfies FastifySchema;

export const createPostSchema = {
    body: z.object({
        title: z.string(),
        body: z.string(),
        published: z.boolean().default(false),
        owner: z.string(),
    }),
    response: {
        200: z.object({
            id: z.string(),
            title: z.string(),
            body: z.string(),
            published: z.boolean(),
            owner: z.string(),
        }),
        400: z.object({
            error: z.string(),
        }),
    },
} satisfies FastifySchema;
