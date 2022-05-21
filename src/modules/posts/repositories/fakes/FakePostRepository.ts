import Post from "@modules/posts/infra/prisma/entities/Post";
import Filter from "@modules/posts/types/Filter";
import IPostRepository from "../IPostRepository";

class FakePostRepository implements IPostRepository {
  posts: Post[] = [];
  async create(post: Post): Promise<Post | undefined> {
    const newId = (this.posts[this.posts.length - 1]?.id || 0) + 1;
    this.posts.push({
      ...post,
      id: newId,
    });
    return { ...post, id: newId };
  }

  async update(post: Post): Promise<Post | undefined> {
    this.posts = this.posts.filter(item => item.id != post.id);
    this.posts.push(post);
    return post;
  }

  async list(filters: Filter): Promise<Post[]> {
    return this.posts.filter(
      item =>
        item.published === (filters?.published || item.published) &&
        item.active === (filters?.active || item.active) &&
        item.author_id === (filters?.author || item.author_id),
    );
  }

  async deleteAll(): Promise<void> {
    this.posts = [];
  }
}

export default FakePostRepository;
