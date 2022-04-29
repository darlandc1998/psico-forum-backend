import AppError from "@shared/errors/AppError";

import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import AuthenticateUserService from "./AuthenticateUserService";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it("Should be able create a new session", async () => {
    await fakeUserRepository.create({
      id: -1,
      name: "Fake authentication",
      email: "fake@hotmail.com",
      password: "123456",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const response = await authenticateUserService.execute({
      email: "fake@hotmail.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
  });

  it("Should not be able to create a new session without wrong email", async () => {
    await fakeUserRepository.create({
      id: -1,
      name: "Fake authentication",
      email: "fake@hotmail.com",
      password: "123456",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await expect(
      authenticateUserService.execute({
        email: "wrong-email@hotmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new session without wrong password", async () => {
    await fakeUserRepository.create({
      id: -1,
      name: "Fake authentication",
      email: "fake@hotmail.com",
      password: "123456",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await expect(
      authenticateUserService.execute({
        email: "fake@hotmail.com",
        password: "wrong-password",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
