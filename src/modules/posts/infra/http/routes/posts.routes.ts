import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import CreatePostController from "../controllers/CreatePostController";
import UpdatePostController from "../controllers/UpdatePostController";
import ListPostController from "../controllers/ListPostController";

const postsRouter = Router();

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const listPostController = new ListPostController();

postsRouter.use(ensureAuthenticated);

postsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      text: Joi.string().required(),
      conver: Joi.string(),
      authorId: Joi.number().required(),
      published: Joi.boolean(),
    },
  }),
  createPostController.create,
);

postsRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      text: Joi.string().required(),
      conver: Joi.string(),
      published: Joi.boolean().required(),
      active: Joi.boolean().required(),
    },
  }),
  updatePostController.update,
);

postsRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      published: Joi.boolean(),
      active: Joi.boolean(),
      author: Joi.number(),
    },
  }),
  listPostController.index,
);

export default postsRouter;
