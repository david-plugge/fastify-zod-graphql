import { db } from '../../plugins/prisma';
import { Prisma } from '@prisma/client';

export function listUsers() {
    return db.user.findMany();
}

export function createUser(
    createUserInput: Prisma.UserCreateWithoutPostsInput,
) {
    return db.user.create({
        data: createUserInput,
        select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
        },
    });
}
