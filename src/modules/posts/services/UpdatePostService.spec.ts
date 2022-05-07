import IPostRepository from "../repositories/IPostRepository";
import FakePostRepository from "../repositories/fakes/FakePostRepository";
import CreatePostService from "./CreatePostService";
import UpdatePostService from "./UpdatePostService";

let fakePostRepository: IPostRepository;
let createPostService: CreatePostService;
let updatePostService: UpdatePostService;

describe("UpdatePost", () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    createPostService = new CreatePostService(fakePostRepository);
    updatePostService = new UpdatePostService(fakePostRepository);
  });

  it("Should be able to update a post", async () => {
    const newPost = {
      title: "Title",
      text: "text",
      cover: null,
      authorId: -1,
    };

    const postCreated = await createPostService.execute(newPost);

    if (!postCreated || !postCreated.id) return;

    const updatePost = {
      id: postCreated.id,
      title: postCreated.title,
      text: postCreated.text,
      cover: postCreated.cover,
      published: true,
      active: true,
    };

    const postUpdated = await updatePostService.execute(updatePost);

    expect(postUpdated).toMatchObject({ published: true, active: true });
  });
});
