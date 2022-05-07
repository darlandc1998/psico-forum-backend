import { inject, injectable } from "tsyringe";
import IUpdatePostDTO from "../dtos/IUpdatePostDTO";
import IPostRepository from "../repositories/IPostRepository";

@injectable()
class UpdatePostService {
  private postRepository: IPostRepository;

  constructor(
    @inject("PostRepository")
    postRepository: IPostRepository,
  ) {
    this.postRepository = postRepository;
  }

  async execute(post: IUpdatePostDTO): Promise<IUpdatePostDTO | undefined> {
    await this.postRepository.update({
      id: post.id,
      title: post.title,
      text: post.text,
      cover: post.cover,
      active: post.active,
      published: post.published,
      author_id: -1,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return post;
  }
}

export default UpdatePostService;
