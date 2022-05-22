import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ICreatePostDTO from "../dtos/input/ICreatePostDTO";
import ICreatedPostDTO from "../dtos/output/ICreatedPostDTO";
import IPostRepository from "../repositories/IPostRepository";

@injectable()
class CreatePostService {
  private postRepository: IPostRepository;

  constructor(
    @inject("PostRepository")
    postRepository: IPostRepository,
  ) {
    this.postRepository = postRepository;
  }

  async execute(postDTO: ICreatePostDTO): Promise<ICreatedPostDTO | undefined> {
    const post = await this.postRepository.create({
      id: postDTO.id || -1,
      title: postDTO.title,
      text: postDTO.title,
      cover: postDTO.cover || null,
      author_id: postDTO.authorId,
      published: postDTO.published || false,
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!post) {
      throw new AppError("Error save the new post!");
    }

    return {
      id: post.id,
      title: post.title,
      text: post.text,
      cover: post?.cover,
      published: post.published,
      authorId: post.author_id,
    };
  }
}

export default CreatePostService;
