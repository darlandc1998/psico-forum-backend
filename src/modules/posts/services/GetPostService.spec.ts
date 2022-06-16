import AppError from "@shared/errors/AppError";
import CreatePostService from "../services/CreatePostService";
import GetPostService from "./GetPostService";
import IPostRepository from "../repositories/IPostRepository";
import FakePostRepository from "../repositories/fakes/FakePostRepository";

let fakePostRepository: IPostRepository;
let createPostService: CreatePostService;
let getPostService: GetPostService;

describe("GetPost", () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    createPostService = new CreatePostService(fakePostRepository);
    getPostService = new GetPostService(fakePostRepository);
  });

  it("Should be to get a post by id", async () => {
    const newPost = {
      title: "Title 1",
      text: "Text 1",
      cover: null,
      authorId: -1,
    };
    const postCreated = await createPostService.execute(newPost);
    if (!postCreated) throw new AppError("Post not created");
    const getPostCreated = await getPostService.execute(postCreated.id);
    expect(getPostCreated).toMatchObject({ id: 1 });
  });

  it("Should not be to get a post by id", async () => {
    const ID_POST_NOT_CREATED = -1;
    await expect(
      getPostService.execute(ID_POST_NOT_CREATED),
    ).rejects.toBeInstanceOf(AppError);
  });
});
