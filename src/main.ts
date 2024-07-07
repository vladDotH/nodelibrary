import Koa from "koa";
// import specs from "src/swagger/swagger.json";
import { koaSwagger } from "koa2-swagger-ui";
import Router from "koa-router";

import { booksController } from "@/controllers/books.controller";

const specs = require("@/swagger/swagger.json");

console.log(process.env.TEST);

const app = new Koa();

app.use(booksController.routes());

const router = new Router({ prefix: "/" });
router.get(
  "api-docs",
  koaSwagger({ routePrefix: false, swaggerOptions: { spec: specs } }),
);

app.use(router.routes());
app.listen(3030, "localhost");
