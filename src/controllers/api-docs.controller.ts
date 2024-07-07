import Router from "koa-router";

export const apiDocsController = new Router({ prefix: "/api-docs" });

apiDocsController.get("/", (ctx, next) => {});
