import { FastifySchema } from 'fastify';
import { z } from 'zod';

export const listUsersSchema = {
    response: {
        200: z.array(
            z.object({
                id: z.string(),
                username: z.string(),
                firstname: z.string(),
                lastname: z.string(),
            }),
        ),
    },
} satisfies FastifySchema;

export const createUserSchema = {
    body: z.object({
        username: z.string(),
        firstname: z.string(),
        lastname: z.string(),
    }),
    response: {
        200: z.object({
            id: z.string(),
            username: z.string(),
            firstname: z.string(),
            lastname: z.string(),
        }),
        400: z.object({
            error: z.string(),
        }),
    },
} satisfies FastifySchema;
