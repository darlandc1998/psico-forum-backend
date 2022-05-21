import Post from "@modules/posts/infra/prisma/entities/Post";
import FakePostRepository from "../repositories/fakes/FakePostRepository";
import IPostRepository from "../repositories/IPostRepository";
import CreatePostService from "./CreatePostService";
import ListPostService from "./ListPostService";

let fakePostRepository: IPostRepository;
let createPostService: CreatePostService;
let listPostService: ListPostService;

describe("ListPost", () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    createPostService = new CreatePostService(fakePostRepository);
    listPostService = new ListPostService(fakePostRepository);
  });

  it("Should be able to list all posts", async () => {
    const postOne = {
      title: "Post one",
      text: "Post one",
      cover: null,
      authorId: -1,
    };
    await createPostService.execute(postOne);
    const postTwo = {
      title: "Post two",
      text: "Post two",
      cover: null,
      authorId: -2,
    };
    await createPostService.execute(postTwo);
    const posts: Post[] = await listPostService.execute();
    expect(posts).toHaveLength(2);
  });
});
