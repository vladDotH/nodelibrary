import Router from "koa-router";
import { booksController } from "@/controllers/books.controller";
import { docsController } from "@/controllers/docs.controller";
import { usersController } from "@/controllers/users.controller";

export const apiController = new Router({ prefix: "/api" });

apiController.use(docsController.routes());
apiController.use(booksController.routes());
apiController.use(usersController.routes());
