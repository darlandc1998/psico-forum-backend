import IPostRepository from "@modules/posts/repositories/IPostRepository";
import { PrismaClient } from "@prisma/client";
import Post from "../entities/Post";

class PostRepository implements IPostRepository {
  prismaClient: PrismaClient | null = null;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async create(post: Post): Promise<Post | undefined> {
    return this.prismaClient?.post.create({
      data: {
        title: post.title,
        text: post.text,
        cover: post.cover,
        author_id: post.author_id,
      },
    });
  }

  async update(post: Post): Promise<Post | undefined> {
    return this.prismaClient?.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        text: post.text,
        cover: post.cover,
        active: post.active,
        published: post.published,
        updated_at: new Date(),
      },
    });
  }
}

export default PostRepository;
