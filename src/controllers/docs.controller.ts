import Router from "koa-router";
import { koaSwagger } from "koa2-swagger-ui";
import specs from "@/swagger/swagger.json";

export const docsController = new Router({ prefix: "/docs" });

docsController.get(
  "/",
  // #swagger.tags = ['Docs']
  koaSwagger({ routePrefix: false, swaggerOptions: { spec: specs } }),
);
