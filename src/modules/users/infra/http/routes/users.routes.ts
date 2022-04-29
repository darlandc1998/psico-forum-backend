import { Router } from "express";

import ListUserController from "../controllers/ListUserController";
import CreateUserController from "../controllers/CreateUserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const listUserController = new ListUserController();
const createUserController = new CreateUserController();

usersRouter.use(ensureAuthenticated);

usersRouter.get("/", listUserController.index);
usersRouter.post("/", createUserController.create);

export default usersRouter;
