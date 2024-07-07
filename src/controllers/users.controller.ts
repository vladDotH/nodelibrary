import Router from "koa-router";

export const usersController = new Router({ prefix: "/users" });

usersController.post("/register", (ctx, next) => {
  // #swagger.tags = ['Users']
});

usersController.post("/login", (ctx, next) => {
  // #swagger.tags = ['Users']
});

usersController.get("/me", (ctx, next) => {
  // #swagger.tags = ['Users']
});

usersController.put("/put/:id/role", (ctx, next) => {
  // #swagger.tags = ['Users']
});
