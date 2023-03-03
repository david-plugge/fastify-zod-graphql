import { createUser, listUsers } from './user.controller';
import { createUserSchema, listUsersSchema } from './user.schema';

export const listUsersHandler: App.RouteHandler<
    typeof listUsersSchema
> = async () => {
    const users = await listUsers();

    return users;
};

export const createUserHandler: App.RouteHandler<
    typeof createUserSchema
> = async (req, reply) => {
    try {
        const user = await createUser(req.body);

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
};
