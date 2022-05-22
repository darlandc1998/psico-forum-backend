import { Router } from "express";

import ListUserController from "../controllers/ListUserController";
import CreateUserController from "../controllers/CreateUserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const listUserController = new ListUserController();
const createUserController = new CreateUserController();

usersRouter.use(ensureAuthenticated);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *        id: 1
 *        name: João Pedro
 *        email: joãopedro@teste.com.br
 *        password: password
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                active:
 *                  type: boolean
 *                createdAt:
 *                  type: Date
 *              example:
 *                - id: 1
 *                  name: João
 *                  email: joão@teste.com.br
 *                  active: true
 *                  createdAt: "2022-04-29T22:53:09.237Z"
 *                - id: 2
 *                  name: Pedro
 *                  email: pedro@teste.com.br
 *                  active: true
 *                  createdAt: "2022-04-30T08:00:00.237Z"
 *                - id: 3
 *                  name: Thiago
 *                  email: Thiago@teste.com.br
 *                  active: true
 *                  createdAt: "2022-05-05T09:00:00.237Z"
 */
usersRouter.get("/", listUserController.index);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to create
 *        schema:
 *          type: object
 *          required:
 *           - name
 *           - email
 *           - password
 *           - passwordConfirmation
 *          properties:
 *            name:
 *             type: string
 *            email:
 *             type: string
 *            password:
 *             type: string
 *            passwordConfirmation:
 *             type: string
 *          example:
 *            name: João
 *            email: joão@teste.com.br
 *            password: password
 *            passwordConfirmation: password
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *              example:
 *                id: 1
 *                name: João
 *                email: joão@teste.com.br
 *       500:
 *         description: Some server error
 */
usersRouter.post("/", createUserController.create);

export default usersRouter;
