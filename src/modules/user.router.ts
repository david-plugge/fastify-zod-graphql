import { z } from 'zod';

export default async function (app: App.Fastify) {
    app.post(
        '/',
        {
            schema: {
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
            },
        },
        async (req, reply) => {
            try {
                const user = await app.db.user.create({
                    data: {
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                    },
                });

                return {
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                };
            } catch (err) {
                reply.statusCode = 400;
                return {
                    error: 'Could not create user',
                };
            }
        },
    );

    app.route({
        url: '/',
        method: 'GET',
        schema: {
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
        },
        handler: (req) => {
            return req.server.db.user.findMany();
        },
    });
}

export const autoPrefix = '/user';
