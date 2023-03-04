import { db } from '../../plugins/prisma';
import { Prisma } from '@prisma/client';

export function listPosts() {
    return db.post.findMany();
}

export function createPost(
    createPostInput: Prisma.PostCreateWithoutOwnerInput & { ownerId: string },
) {
    return db.post.create({
        data: createPostInput,
    });
}
