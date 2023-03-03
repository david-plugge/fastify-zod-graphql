import { IResolvers } from 'mercurius';

const resolvers: IResolvers = {
    Query: {
        users: async (_, _args, { db }) => {
            const users = await db.user.findMany();
            return users;
        },
        user: async (_, { id }, { db }) => {
            const user = await db.user.findUnique({
                where: { id: id },
            });
            return user!;
        },

        posts: async (_, _args, { db }) => {
            const posts = await db.post.findMany();
            return posts;
        },
        post: async (_, { id }, { db }) => {
            const post = await db.post.findUnique({
                where: { id: parseInt(id) },
            });
            return post!;
        },
    },
    Mutation: {
        createUser: async (_, { data }, { db }) => {
            const user = await db.user.create({ data });
            return user;
        },
        createPost: async (_, { data }, { db }) => {
            const post = await db.post.create({
                data: {
                    ...data,
                },
            });
            return post;
        },
    },
};
export default resolvers;
