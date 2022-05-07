import { container } from "tsyringe";

import IPostRepository from "@modules/posts/repositories/IPostRepository";
import PostRepository from "@modules/posts/infra/prisma/repositories/PostRepository";

container.registerSingleton<IPostRepository>("PostRepository", PostRepository);
