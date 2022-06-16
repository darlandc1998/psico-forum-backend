import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import CreatePostController from "../controllers/CreatePostController";
import UpdatePostController from "../controllers/UpdatePostController";
import ListPostController from "../controllers/ListPostController";
import GetPostController from "../controllers/GetPostController";

const postsRouter = Router();

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const listPostController = new ListPostController();
const getPostController = new GetPostController();

postsRouter.use(ensureAuthenticated);

/**
 * @swagger
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - title
 *         - text
 *         - authorId
 *       properties:
 *         id:
 *           type: integer
 *           description: The post id
 *         title:
 *           type: string
 *           description: The post title
 *         text:
 *           type: string
 *           description: The post text
 *         cover:
 *           type: string
 *           description: The post url cover
 *         published:
 *           type: boolean
 *           description: The post is published, default is false
 *         active:
 *           type: boolean
 *           description: The post is active, default is true
 *         createdAt:
 *           type: date
 *           description: The post date created, default is currente date
 *         updatedAt:
 *           type: date
 *           description: The post date updated, default is currente date
 *         authorId:
 *           type: integer
 *           description: The post author
 *       example:
 *        id: 1
 *        title: First post
 *        text: First post
 *        published: true
 *        active: true
 *        createdAt: 2022-04-22T21:46:53.250Z
 *        updatedAt: 2022-04-22T21:46:53.250Z
 *        authorId: 5
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: post
 *        description: The post to create
 *        schema:
 *          type: object
 *          required:
 *           - title
 *           - text
 *           - authorId
 *          properties:
 *            title:
 *             type: string
 *            text:
 *             type: string
 *            authorId:
 *             type: integer
 *            published:
 *             type: boolean
 *          example:
 *            title: First post
 *            text: First post
 *            published: true
 *            authorId: 1
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                text:
 *                  type: string
 *                published:
 *                  type: boolean
 *                authorId:
 *                  type: integer
 *              example:
 *                id: 1
 *                title: First post
 *                text: First post
 *                published: true
 *                authorId: 1
 *       500:
 *         description: Some server error
 */
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
/**
 * @swagger
 * /posts/:id:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id post to update
 *      - in: body
 *        name: post
 *        description: The post to update
 *        schema:
 *          type: object
 *          required:
 *           - title
 *           - text
 *           - published
 *           - active
 *          properties:
 *            title:
 *             type: string
 *            text:
 *             type: string
 *            cover:
 *             type: string
 *            published:
 *             type: boolean
 *            active:
 *             type: boolean
 *          example:
 *            title: Post to update
 *            text: Post to update
 *            cover: cover
 *            published: true
 *            active: true
 *     responses:
 *       200:
 *         description: The post was successfully updated
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                text:
 *                  type: string
 *                cover:
 *                  type: string
 *                published:
 *                  type: boolean
 *                active:
 *                  type: boolean
 *              example:
 *                id: 1
 *                title: Post to update
 *                text: Post to update
 *                cover: cover
 *                published: true
 *                active: true
 *       500:
 *         description: Some server error
 */
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
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all the post
 *     tags: [Posts]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: published
 *         description: Get all posts published
 *         schema:
 *          type: boolean
 *       - in: query
 *         name: active
 *         description: Get all posts active
 *         schema:
 *          type: boolean
 *       - in: query
 *         name: author
 *         description: Get all posts by author
 *         schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                text:
 *                  type: string
 *                cover:
 *                  type: string
 *                published:
 *                  type: boolean
 *                active:
 *                  type: boolean
 *                createdAt:
 *                  type: Date
 *                updatedAt:
 *                  type: Date
 *                author:
 *                  type: object
 *              example:
 *                - id: 1
 *                  title: First post
 *                  text: First post
 *                  cover: cover
 *                  published: true
 *                  active: true
 *                  createdAt: "2022-04-29T22:53:09.237Z"
 *                  updatedAt: "2022-04-29T22:53:09.237Z"
 *                  author: {"id":5,"name":"João"}
 *                - id: 2
 *                  title: Second post
 *                  text: Second post
 *                  published: true
 *                  active: false
 *                  createdAt: "2022-05-01T10:00:00.007Z"
 *                  updatedAt: "2022-05-01T10:00:00.007Z"
 *                  author: {"id":5,"name":"João"}
 *                - id: 3
 *                  title: Third post
 *                  text: Third post
 *                  published: false
 *                  active: false
 *                  createdAt: "2022-06-01T10:00:00.007Z"
 *                  updatedAt: "2022-06-01T10:00:00.007Z"
 *                  author: {"id":6,"name":"Pedro"}
 */
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

postsRouter.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: { id: Joi.number().required() } }),
  getPostController.index,
);

export default postsRouter;
