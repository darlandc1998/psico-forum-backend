import User from "../../infra/prisma/entities/User";
import IUserRepository from "../IUserRepository";

class FakeUserRepository implements IUserRepository {
  private users: User[] = [
    new User({
      id: -1,
      name: "Default",
      email: "default@gmail.com",
      password: "password_fake",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }),
    new User({
      id: -2,
      name: "Default 2",
      email: "default2@gmail.com",
      password: "password_fake2",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }),
  ];

  public async findAllActive(): Promise<User[]> {
    return this.users.filter(item => item.active);
  }

  public async findByEmail(email: string): Promise<User | null | undefined> {
    return this.users.find(item => item.email === email);
  }

  public async create(createUser: User): Promise<User> {
    const user = new User({
      id: -1,
      name: createUser.name,
      email: createUser.email,
      password: createUser.password || "password_fake",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);
    return user;
  }
}

export default FakeUserRepository;
