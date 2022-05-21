import { Request, Response } from "express";
import { container } from "tsyringe";
import ListPostService from "@modules/posts/services/ListPostService";

export default class ListPostController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPostService = container.resolve(ListPostService);
    const posts = await listPostService.execute();
    return response.json(posts);
  }
}
