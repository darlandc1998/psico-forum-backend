import { injectable, inject } from "tsyringe";
import IListPostDTO from "../dtos/output/IListPostDTO";
import IPostRepository from "../repositories/IPostRepository";
import Filter from "../types/Filter";

@injectable()
class ListPostService {
  private postRepository: IPostRepository;

  constructor(
    @inject("PostRepository")
    postRepository: IPostRepository,
  ) {
    this.postRepository = postRepository;
  }

  async execute(filters?: Filter): Promise<IListPostDTO[]> {
    const posts = await this.postRepository.list(filters);
    const postsDTO = posts.map(item => ({
      id: item.id,
      title: item.title,
      text: item.text,
      cover: item.cover,
      published: item.published,
      active: item.active,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      author: {
        id: item.author?.id,
        name: item.author?.name,
      },
    }));
    return postsDTO;
  }
}

export default ListPostService;
