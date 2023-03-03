import { db } from '../plugins/prisma';

const resolvers = {
    Query: {
        posts: async (_, obj) => {
            const posts = await db.post.findMany();
            return posts;
        },
        post: async (_, { id }) => {
            const post = await db.post.findUnique({ where: { id } });
            return post;
        },
    },
    Mutation: {
        createPost: async (_, { data }) => {
            const post = await db.post.create({ data });
            return post;
        },
    },
};
export default resolvers;
