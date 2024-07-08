import Router from "koa-router";
import { booksService } from "@/services/books.service";
import { BookDto } from "@/dto/books";
import Joi from "joi";
import { validate } from "@/util/validation";
import { StatusCodes } from "http-status-codes";
import { authGuard } from "@/auth/auth.guard";
import { rolesGuard } from "@/auth/roles.guard";
import { RoleBits } from "@/auth/roles";

export const booksController = new Router({ prefix: "/books" });

booksController.post(
  "/",
  authGuard("jwt"),
  rolesGuard(RoleBits.admin),
  async (ctx) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Добавить книгу'
    // #swagger.description = 'Роли: администратор'
    /* #swagger.parameters['body'] = {
    in: 'body',
    schema: {
      title: "Name",
      author: "Author",
      publicationDate: "2024-10-08",
      genres: ['Genre']
    }
  }*/
    const book = validate(BookDto, ctx.request.body);
    ctx.body = await booksService.addBook(book);
    ctx.status = StatusCodes.OK;
  },
);

booksController.get("/", async (ctx) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Получить список книг'
  // #swagger.description = 'Роли: не требуется'
  ctx.body = await booksService.getBooks();
  ctx.status = StatusCodes.OK;
});

booksController.get("/:id", async (ctx) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Получить информацию о книге'
  // #swagger.description = 'Роли: не требуется'
  // #swagger.parameters['id'] = {}
  const id = validate(Joi.number(), ctx.params.id);
  console.log(id);
  ctx.body = await booksService.getBook(id);
  ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
});

booksController.put(
  "/:id",
  authGuard("jwt"),
  rolesGuard(RoleBits.admin),
  async (ctx) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Обновить данные о книге'
    // #swagger.description = 'Роли: администратор'
    // #swagger.parameters['id'] = {}
    /* #swagger.parameters['body'] = {
  in: 'body',
  schema: {
    title: "Name",
    author: "Author",
    publicationDate: "2024-10-08",
    genres: ['Genre']
  }
  }*/
    const id = validate(Joi.number(), ctx.params.id);
    const book = validate(BookDto, ctx.request.body);
    ctx.body = await booksService.updateBook(id, book);
    ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
  },
);

booksController.delete(
  "/:id",
  authGuard("jwt"),
  rolesGuard(RoleBits.admin),
  async (ctx) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Удалить книгу'
    // #swagger.description = 'Роли: администратор'
    // #swagger.parameters['id'] = {}
    const id = validate(Joi.number(), ctx.params.id);
    ctx.body = await booksService.deleteBook(id);
    ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
  },
);
