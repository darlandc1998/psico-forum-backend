import Post from "@modules/posts/infra/prisma/entities/Post";
import IPostRepository from "../repositories/IPostRepository";

class ListPostService {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(): Promise<Post[]> {
    return await this.postRepository.list();
  }
}

export default ListPostService;
