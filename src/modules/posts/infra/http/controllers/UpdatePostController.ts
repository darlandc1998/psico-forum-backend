import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdatePostService from "@modules/posts/services/UpdatePostService";

export default class UpdatePostController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updatePostService = container.resolve(UpdatePostService);
    const postId = request.params.id;
    const postFromBody = request.body;
    const postUpdated = await updatePostService.execute({
      ...postFromBody,
      id: postId,
    });
    return response.json(postUpdated);
  }
}
