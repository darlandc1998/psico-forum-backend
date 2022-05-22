import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import SessionController from "../controllers/SessionController";

const sessionsRouter = Router();
const sessionController = new SessionController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sessions:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email to login app
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *        email: joãopedro@teste.com.br
 *        password: password
 */

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: The sessions managing API
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a new session to user
 *     tags: [Sessions]
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: session
 *        description: The session to create
 *        schema:
 *          type: object
 *          required:
 *           - email
 *           - password
 *          properties:
 *            email:
 *             type: string
 *            password:
 *             type: string
 *          example:
 *            email: joão@teste.com.br
 *            password: password
 *     responses:
 *       200:
 *         description: The session was successfully created
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                token:
 *                  type: string
 *              example:
 *                user: "Object user"
 *                token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTMyMjIxOTYsImV4cCI6MTY1MzMwODU5Niwic3ViIjoiNSJ9.r3PruLvYPrl3OoNQZcJ2LCWUs6PZRTyfmK5bSNkvkhs
 *       500:
 *         description: Some server error
 */
sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
