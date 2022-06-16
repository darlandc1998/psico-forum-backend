import { Request, Response } from "express";
import { container } from "tsyringe";
import GetPostService from "@modules/posts/services/GetPostService";

export default class GetPostController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getPostService = container.resolve(GetPostService);
    const post = await getPostService.execute(Number(request.params.id));
    return response.json(post);
  }
}
