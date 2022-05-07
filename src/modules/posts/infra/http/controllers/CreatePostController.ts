import { Request, Response } from "express";
import { container } from "tsyringe";
import CreatePostService from "@modules/posts/services/CreatePostService";

export default class CreatePostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createPostService = container.resolve(CreatePostService);
    const postFromBody = request.body;
    const newPost = await createPostService.execute(postFromBody);
    return response.json(newPost);
  }
}
