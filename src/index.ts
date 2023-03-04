import fastify from 'fastify';

import graphql from './plugins/graphql';
import env from './plugins/env';
import rest from './plugins/rest';

const app = fastify();

app.register(env);
app.register(graphql);
app.register(rest);

async function run() {
    await app.ready();

    await app.listen({
        port: 3000,
    });

    console.log(`Documentation running at http://localhost:3000/documentation`);
    console.log(`Graphql running at http://localhost:3000/graphiql`);
}

run();
