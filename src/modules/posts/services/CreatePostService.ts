import { injectable, inject } from "tsyringe";
import ICreatePostDTO from "../dtos/ICreatePostDTO";
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

  async execute(postDTO: ICreatePostDTO): Promise<ICreatePostDTO | undefined> {
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
    return { ...postDTO, id: post?.id };
  }
}

export default CreatePostService;
