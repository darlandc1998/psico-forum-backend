import { injectable, inject } from "tsyringe";
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
    return {
      id: idPost,
      title: "Title 1",
      text: "Text 1",
      cover: null,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: 1,
        name: "Fake author",
      },
    };
  }
}

export default GetPostService;
