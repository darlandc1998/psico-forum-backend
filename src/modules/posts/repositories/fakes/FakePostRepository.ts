import Post from "@modules/posts/infra/prisma/entities/Post";
import IPostRepository from "../IPostRepository";

class FakePostRepository implements IPostRepository {
  posts: Post[] = [];
  async create(post: Post): Promise<Post | undefined> {
    this.posts.push(post);
    return post;
  }
}

export default FakePostRepository;
