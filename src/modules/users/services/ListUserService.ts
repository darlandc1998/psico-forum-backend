import { injectable, inject } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";
import IListUserDTO from "../dtos/output/IListUserDTO";

@injectable()
class ListUserService {
  userRepository: IUserRepository;

  constructor(
    @inject("UserRepository")
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<IListUserDTO[] | null> {
    const users = await this.userRepository.findAllActive();
    const usersDTO = users.map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      active: item.active,
      createdAt: item.created_at,
    }));
    return usersDTO;
  }
}

export default ListUserService;
