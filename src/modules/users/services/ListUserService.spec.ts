import ListUserService from "./ListUserService";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";

let listUserService: ListUserService;
let fakeUserRepository: FakeUserRepository;

describe("ListUserService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listUserService = new ListUserService(fakeUserRepository);
  });

  it("Should be able list to users", async () => {
    const users = await listUserService.execute();
    expect(users?.length).toBe(2);
  });
});
