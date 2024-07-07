import Router from "koa-router";

export const booksController = new Router({ prefix: "/books" });

booksController.post("/", (ctx, next) => {});

booksController.get("/", (ctx, next) => {});

booksController.get("/:id", (ctx, next) => {});

booksController.put("/:id", (ctx, next) => {});

booksController.delete("/:id", (ctx, next) => {});
