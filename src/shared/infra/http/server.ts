import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { errors } from "celebrate";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import limiterRequests from "@config/requestRateLimiter";
import routes from "./routes";
import AppError from "../../errors/AppError";
import swaggerOptions from "@config/swagger";
import "@shared/container";

const specs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(limiterRequests);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const port = Number(process.env.APP_PORT) || 3000;

app.listen(port, () => {
  console.log("\x1b[33m%s\x1b[0m", `=> 🚀 Server running on the port: ${port}`);
});
