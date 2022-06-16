import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IGetPostDTO from "../dtos/output/IGetPostDTO";
import IPostRepository from "../repositories/IPostRepository";

@injectable()
class GetPostService {
  private postRepository: IPostRepository;

  constructor(
    @inject("PostRepository")
    postRepository: IPostRepository,
  ) {
    this.postRepository = postRepository;
  }

  async execute(idPost: number): Promise<IGetPostDTO> {
    const post = await this.postRepository.getById(idPost);

    if (!post) throw new AppError("Post not found!");

    return {
      id: post.id,
      title: post.title,
      text: post.text,
      cover: post.cover,
      published: post.published,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      author: {
        id: post.author?.id,
        name: post.author?.name,
      },
    };
  }
}

export default GetPostService;
