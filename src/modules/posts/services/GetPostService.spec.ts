import CreatePostService from "../services/CreatePostService";
import IPostRepository from "../repositories/IPostRepository";
import FakePostRepository from "../repositories/fakes/FakePostRepository";

let fakePostRepository: IPostRepository;
let createPostService: CreatePostService;

describe("GetPost", () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    createPostService = new CreatePostService(fakePostRepository);
  });

  it("Should be to get a post by id", async () => {
    const newPost = {
      title: "Title 1",
      text: "Text 1",
      cover: null,
      authorId: -1,
    };
    const postCreated = await createPostService.execute(newPost);
    expect(postCreated).toMatchObject({ id: 1 });
  });
});
