import Post from "@modules/posts/infra/prisma/entities/Post";
import { injectable, inject } from "tsyringe";
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

  async execute(filters?: Filter): Promise<Post[]> {
    return await this.postRepository.list(filters);
  }
}

export default ListPostService;
