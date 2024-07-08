import Router from "koa-router";
import { usersService } from "@/services/users.service";
import { validate } from "@/util/validation";
import { RoleChangeDto, UserCreateDto } from "@/dto/users";
import { BadRequest } from "http-errors";
import { StatusCodes } from "http-status-codes";
import { authGuard } from "@/auth/auth.guard";
import { Context } from "koa";
import Joi from "joi";
import { rolesGuard } from "@/auth/roles.guard";
import { RoleBits } from "@/auth/roles";
import { configService } from "@/services/config.service";

export const usersController = new Router({
  prefix: "/users",
});

usersController.post("/register", async (ctx) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Зарегистрироваться в системе'
  // #swagger.description = 'Роли: не требуется'
  /* #swagger.parameters['body'] = {
    in: 'body',
    schema: {
      username: "user",
      password: "password",
      email: "email@mail.com"
    }
  }*/
  const userData = validate(UserCreateDto, ctx.request.body);
  const user = await usersService.createUser(userData);
  if (!user) throw BadRequest("user already exists");
  await usersService.sendConfirmationEmail(user);
  ctx.body = user;
  ctx.status = StatusCodes.OK;
});

usersController.get("/confirm/:token", async (ctx) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Подтвердить почту по токену'
  // #swagger.description = 'Роли: не требуется'
  // #swagger.parameters['token'] = {}
  const token = validate(Joi.string(), ctx.params.token);
  const res = await usersService.confirmEmail(token);
  if (!res) throw BadRequest("incorrect token");
  ctx.body = res;
  ctx.status = StatusCodes.OK;
});

usersController.post("/login", authGuard("local"), async (ctx: Context) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Войти в систему'
  /* #swagger.parameters['body'] = {
    in: 'body',
    schema: {
      username: "user",
      password: "password",
    }
  }*/
  const token = await usersService.giveToken(ctx.user);
  ctx.cookies.set(configService.COOKIE_KEY, token, {
    maxAge: +configService.JWT_EXPIRES,
    httpOnly: true,
    signed: true,
  });
  ctx.body = ctx.user;
  ctx.status = StatusCodes.OK;
});

usersController.get("/me", authGuard("jwt"), (ctx: Context) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Получить текущего пользователя'
  // #swagger.description = 'Роли: пользователь, администратор'
  ctx.body = ctx.user;
  ctx.status = StatusCodes.OK;
});

usersController.put(
  "/put/:id/role",
  authGuard("jwt"),
  rolesGuard(RoleBits.admin),
  (ctx) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Изменить роли пользователя'
    // #swagger.description = 'Роли: администратор'
    // #swagger.parameters['id'] = {}
    /* #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        role: 1
      }
    }*/
    const id = validate(Joi.number(), ctx.params.id);
    const rolesData = validate(RoleChangeDto, ctx.request.body);
    usersService.changeRoles(id, rolesData.role);
    ctx.status = StatusCodes.OK;
  },
);
