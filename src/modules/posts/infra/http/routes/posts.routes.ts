import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import CreatePostController from "../controllers/CreatePostController";

const postsRouter = Router();

const createPostController = new CreatePostController();

postsRouter.use(ensureAuthenticated);

postsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      text: Joi.string().required(),
      conver: Joi.string(),
      authorId: Joi.number().required(),
    },
  }),
  createPostController.create,
);

export default postsRouter;
