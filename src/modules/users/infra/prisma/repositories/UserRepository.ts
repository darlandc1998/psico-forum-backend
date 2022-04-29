import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "../entities/User";
import { PrismaClient } from "@prisma/client";

class UserRepository implements IUserRepository {
  prismaClient: PrismaClient | null = null;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async findAllActive(): Promise<User[]> {
    const usersPrisma = await this.prismaClient?.user.findMany({
      where: {
        active: true,
      },
    });

    return usersPrisma || [];
  }

  async findByEmail(email: string): Promise<User | null | undefined> {
    return await this.prismaClient?.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(user: User): Promise<User | undefined> {
    return await this.prismaClient?.user.create({
      data: { name: user.name, email: user.email, password: user.password },
    });
  }
}

export default UserRepository;
