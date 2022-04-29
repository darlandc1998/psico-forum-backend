import { Request, Response } from "express";
import { container } from "tsyringe";
import ListUserService from "../../../services/ListUserService";

export default class ListUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);
    const users = await listUserService.execute();
    return response.json(users);
  }
}
