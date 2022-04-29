import { Request, Response } from "express";
import { container } from "tsyringe";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import CreateUserService from "../../../services/CreateUserService";

export default class CreateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const userFromBody: ICreateUserDTO = request.body;
    const newUser = await createUserService.execute(userFromBody);
    return response.json(newUser);
  }
}
