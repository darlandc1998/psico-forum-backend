import Post from "@modules/posts/infra/prisma/entities/Post";
import Filter from "../types/Filter";

export default interface IPostRepository {
  create(post: Post): Promise<Post | undefined>;
  update(post: Post): Promise<Post | undefined>;
  list(filters?: Filter): Promise<Post[]>;
  getById(id: number): Promise<Post | null | undefined>;
  deleteAll(): Promise<void>;
}
