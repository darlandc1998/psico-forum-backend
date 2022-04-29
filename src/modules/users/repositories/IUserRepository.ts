import User from "../infra/prisma/entities/User";

export default interface IUserRepository {
  findAllActive(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null | undefined>;
  create(user: User): Promise<User | undefined>;
}
