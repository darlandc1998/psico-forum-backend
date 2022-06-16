import IPostRepository from "@modules/posts/repositories/IPostRepository";
import Filter from "@modules/posts/types/Filter";
import { PrismaClient } from "@prisma/client";
import Post from "../entities/Post";
import { getFiltersToList } from "./PostRepositoryRules";

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
        published: post.published,
      },
    });
  }

  async update(post: Post): Promise<Post | undefined> {
    return this.prismaClient?.post.update({
      where: { id: Number(post.id) },
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

  async list(filters?: Filter): Promise<Post[]> {
    return (
      this.prismaClient?.post.findMany({
        where: getFiltersToList(filters),
        orderBy: {
          created_at: "asc",
        },
        include: {
          author: true,
        },
      }) || []
    );
  }

  async getById(idPost: number): Promise<Post | null | undefined> {
    return this.prismaClient?.post.findUnique({
      where: {
        id: idPost,
      },
      include: {
        author: true,
      },
    });
  }

  async deleteAll(): Promise<void> {
    this.prismaClient?.post.deleteMany();
  }
}

export default PostRepository;
