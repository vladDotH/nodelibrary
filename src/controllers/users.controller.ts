import Router from "koa-router";

export const usersController = new Router({ prefix: "users" });

usersController.post("/register", (ctx, next) => {});

usersController.post("/login", (ctx, next) => {});

usersController.get("/me", (ctx, next) => {});

usersController.put("/put/:id/role", (ctx, next) => {});
