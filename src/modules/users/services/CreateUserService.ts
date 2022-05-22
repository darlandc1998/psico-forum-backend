import { injectable, inject } from "tsyringe";
import User from "../infra/prisma/entities/User";
import ICreateUser from "../dtos/input/ICreateUserDTO";
import IUserRepository from "../repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import ICreatedUserDTO from "../dtos/output/ICreatedUserDTO";

@injectable()
class CreateUserService {
  private userRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor(
    @inject("UserRepository")
    userRepository: IUserRepository,
    @inject("HashProvider")
    hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    name,
    email,
    password,
    passwordConfirmation,
  }: ICreateUser): Promise<ICreatedUserDTO | undefined> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used!");
    }

    if (password !== passwordConfirmation) {
      throw new AppError("Passwords do not match!");
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const userCreated = await this.userRepository.create(
      new User({
        id: -1,
        name,
        email,
        password: passwordHashed,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }),
    );

    if (!userCreated) {
      throw new AppError("Error save the new user!");
    }

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
    };
  }
}

export default CreateUserService;
