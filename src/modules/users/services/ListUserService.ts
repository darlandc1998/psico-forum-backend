import User from "../infra/prisma/entities/User";
import { injectable, inject } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class ListUserService {
  userRepository: IUserRepository;

  constructor(
    @inject("UserRepository")
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[] | null> {
    const users = await this.userRepository.findAllActive();
    return users;
  }
}

export default ListUserService;
