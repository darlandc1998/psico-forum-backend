import CreatePostService from "../services/CreatePostService";
import IPostRepository from "../repositories/IPostRepository";
import FakePostRepository from "../repositories/fakes/FakePostRepository";

let fakePostRepository: IPostRepository;
let createPostService: CreatePostService;

describe("CreatePost", () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    createPostService = new CreatePostService(fakePostRepository);
  });

  it("Should be create a new post", async () => {
    const newPost = {
      title: "Title",
      text: "text",
      cover: null,
      authorId: -1,
    };
    const postCreated = await createPostService.execute(newPost);
    expect(postCreated).toMatchObject({ id: -1 });
  });
});
