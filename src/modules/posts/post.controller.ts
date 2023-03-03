import { db } from '../../plugins/prisma';
import { Prisma } from '@prisma/client';

export function listPosts() {
    return db.post.findMany();
}

export function createPost(createPostInput: Prisma.PostCreateInput) {
    return db.post.create({
        data: createPostInput,
    });
}
