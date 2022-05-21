import { Request, Response } from "express";
import { container } from "tsyringe";
import queryString from "query-string";
import ListPostService from "@modules/posts/services/ListPostService";

export default class ListPostController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPostService = container.resolve(ListPostService);
    const filters = queryString.parse(queryString.stringify(request.query), {
      parseBooleans: true,
      parseNumbers: true,
    });
    const posts = await listPostService.execute(filters);
    return response.json(posts);
  }
}
