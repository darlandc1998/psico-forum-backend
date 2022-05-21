import Post from "@modules/posts/infra/prisma/entities/Post";
import FakePostRepository from "../repositories/fakes/FakePostRepository";
import IPostRepository from "../repositories/IPostRepository";
import Filters from "../types/Filter";
import CreatePostService from "./CreatePostService";
import ListPostService from "./ListPostService";
import UpdatePostService from "./UpdatePostService";

let fakePostRepository: IPostRepository;
let createPostService: CreatePostService;
let listPostService: ListPostService;
let updatePostService: UpdatePostService;

describe("ListPost", () => {
  beforeEach(async () => {
    fakePostRepository = new FakePostRepository();
    createPostService = new CreatePostService(fakePostRepository);
    listPostService = new ListPostService(fakePostRepository);
    updatePostService = new UpdatePostService(fakePostRepository);

    await fakePostRepository.deleteAll();
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

  it("Should be able to list all posts published", async () => {
    const postPublished = {
      title: "Post published",
      text: "Post published",
      cover: null,
      authorId: -1,
    };
    const postCreated = await createPostService.execute(postPublished);

    if (!postCreated || !postCreated.id) return;

    const updatePost = {
      id: postCreated.id,
      title: postCreated.title,
      text: postCreated.text,
      cover: postCreated.cover,
      published: true,
      active: true,
    };

    await updatePostService.execute(updatePost);

    const filters: Filters = {
      published: true,
    };

    const posts: Post[] = await listPostService.execute(filters);
    expect(posts).toHaveLength(1);
  });

  it("Should be able to list all posts active", async () => {
    const postActive = {
      title: "Post active",
      text: "Post active",
      cover: null,
      authorId: -1,
    };
    const postCreated = await createPostService.execute(postActive);

    if (!postCreated || !postCreated.id) return;

    const updatePost = {
      id: postCreated.id,
      title: postCreated.title,
      text: postCreated.text,
      cover: postCreated.cover,
      published: false,
      active: true,
    };

    await updatePostService.execute(updatePost);

    const filters: Filters = {
      active: true,
    };

    const posts: Post[] = await listPostService.execute(filters);
    expect(posts).toHaveLength(1);
  });

  it("Should be able to list all posts by author João", async () => {
    const postOneFromAuthor = {
      title: "Post one from author João",
      text: "Post one from author João",
      cover: null,
      authorId: -1,
    };
    await createPostService.execute(postOneFromAuthor);
    const postTwoFromAuthor = {
      title: "Post two from author João",
      text: "Post two from author João",
      cover: null,
      authorId: -1,
    };
    await createPostService.execute(postTwoFromAuthor);
    const filters: Filters = {
      author: -1,
    };
    const posts: Post[] = await listPostService.execute(filters);
    expect(posts).toHaveLength(2);
  });
});
