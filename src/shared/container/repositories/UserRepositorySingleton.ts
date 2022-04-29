import { container } from "tsyringe";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import UserRepository from "@modules/users/infra/prisma/repositories/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
