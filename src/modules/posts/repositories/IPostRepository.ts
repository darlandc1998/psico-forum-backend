import Post from "@modules/posts/infra/prisma/entities/Post";

export default interface IPostRepository {
  create(post: Post): Promise<Post | undefined>;
}
