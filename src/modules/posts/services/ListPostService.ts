import Post from "@modules/posts/infra/prisma/entities/Post";
import { injectable, inject } from "tsyringe";
import IPostRepository from "../repositories/IPostRepository";

@injectable()
class ListPostService {
  private postRepository: IPostRepository;

  constructor(
    @inject("PostRepository")
    postRepository: IPostRepository,
  ) {
    this.postRepository = postRepository;
  }

  async execute(): Promise<Post[]> {
    return await this.postRepository.list();
  }
}

export default ListPostService;
