import { injectable, inject } from "tsyringe";
import User from "../infra/prisma/entities/User";
import ICreateUser from "../dtos/ICreateUserDTO";
import IUserRepository from "../repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

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
    password_confirmation,
  }: ICreateUser): Promise<User | undefined> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used!");
    }

    if (password !== password_confirmation) {
      throw new AppError("Passwords do not match!");
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    return this.userRepository.create(
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
  }
}

export default CreateUserService;
