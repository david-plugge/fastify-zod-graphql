import { createPost, listPosts } from './post.controller';
import { createPostSchema, listPostsSchema } from './post.schema';

export const listPostsHandler: App.RouteHandler<
    typeof listPostsSchema
> = async () => {
    const users = await listPosts();

    return users;
};

export const createPostHandler: App.RouteHandler<
    typeof createPostSchema
> = async (req, reply) => {
    try {
        const post = await createPost(req.body);

        return {
            id: post.id,
            title: post.title,
            body: post.body,
            ownerId: post.ownerId,
        };
    } catch (err) {
        reply.statusCode = 400;
        return {
            error: 'Could not create post',
        };
    }
};
