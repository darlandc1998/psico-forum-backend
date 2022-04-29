import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

import User from "../infra/prisma/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  userRepository: IUserRepository;
  hashProvider: IHashProvider;

  constructor(
    @inject("UserRepository")
    userRepository: IUserRepository,
    @inject("HashProvider")
    hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password || "default",
    );

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    //Usuário autenticado
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
