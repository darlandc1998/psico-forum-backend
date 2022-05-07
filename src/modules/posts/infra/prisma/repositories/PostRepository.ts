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
}

export default PostRepository;
