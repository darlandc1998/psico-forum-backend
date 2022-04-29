import CreateUserService from "./CreateUserService";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it("Should be able create a new user", async () => {
    const newUser = await createUserService.execute({
      name: "Fake",
      email: "fake@hotmail.com",
      password: "123456",
      password_confirmation: "123456",
    });

    expect(newUser).toEqual(
      expect.objectContaining({ name: "Fake", email: "fake@hotmail.com" }),
    );
  });

  it("Should not be able a new user with same email", async () => {
    const user = {
      name: "Fake",
      email: "fake@hotmail.com",
      password: "123456",
      password_confirmation: "123456",
    };

    await createUserService.execute(user);

    await expect(createUserService.execute(user)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it("Should not be able create a new user with diferentes passwords", async () => {
    await expect(
      createUserService.execute({
        name: "Fake",
        email: "fake@hotmail.com",
        password: "123",
        password_confirmation: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
