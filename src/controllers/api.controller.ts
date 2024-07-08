import Router from "koa-router";
import { booksController } from "@/controllers/books.controller";
import { docsController } from "@/controllers/docs.controller";
import { usersController } from "@/controllers/users.controller";
import { configService } from "@/services/config.service";

export const apiController = new Router({
  prefix: `/${configService.APP_PREFIX}`,
});

apiController.use(docsController.routes());
apiController.use(booksController.routes());
apiController.use(usersController.routes());
