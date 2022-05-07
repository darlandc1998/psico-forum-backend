import Post from "@modules/posts/infra/prisma/entities/Post";
import IPostRepository from "../IPostRepository";

class FakePostRepository implements IPostRepository {
  posts: Post[] = [];
  async create(post: Post): Promise<Post | undefined> {
    this.posts.push({
      ...post,
      id: (this.posts[this.posts.length - 1]?.id || 0) + 1,
    });
    return post;
  }

  async update(post: Post): Promise<Post | undefined> {
    this.posts.filter(item => item.id != post.id);
    this.posts.push(post);
    return post;
  }
}

export default FakePostRepository;
