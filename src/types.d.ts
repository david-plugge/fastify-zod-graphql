import {
    FastifyBaseLogger,
    FastifyInstance,
    FastifySchema,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RouteHandler,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z, ZodSchema } from 'zod';

export type FastifyZod = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    ZodTypeProvider
>;

export type RouteHandlerZod<T extends FastifySchema> = RouteHandler<
    {
        Body: T['body'] extends ZodSchema ? z.infer<T['body']> : undefined;
        Headers: T['headers'] extends ZodSchema
            ? z.infer<T['headers']>
            : undefined;
        Params: T['params'] extends ZodSchema
            ? z.infer<T['params']>
            : undefined;
        Querystring: T['querystring'] extends ZodSchema
            ? z.infer<T['querystring']>
            : undefined;
        Reply: T['response'][any] extends ZodSchema
            ? z.infer<T['response'][any]>
            : undefined;
    },
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    unknown,
    FastifySchema,
    ZodTypeProvider,
    FastifyBaseLogger
>;

declare global {
    namespace App {
        type Fastify = FastifyZod;
        type RouteHandler<T extends FastifySchema> = RouteHandlerZod<T>;
    }
}
