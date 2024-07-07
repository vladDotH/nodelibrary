import Router from "koa-router";
import { booksService } from "@/services/books.service";
import { BookDto } from "@/dto/books";
import Joi from "joi";
import { validate } from "@/util/validation";
import { StatusCodes } from "http-status-codes";

export const booksController = new Router({ prefix: "/books" });

booksController.post("/", async (ctx) => {
  // #swagger.tags = ['Books']
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
});

booksController.get("/", async (ctx) => {
  // #swagger.tags = ['Books']
  console.log("books");
  ctx.body = await booksService.getBooks();
  ctx.status = StatusCodes.OK;
});

booksController.get("/:id", async (ctx) => {
  // #swagger.tags = ['Books']
  // #swagger.parameters['id'] = {}
  const id = validate(Joi.number(), ctx.params.id);
  console.log(id);
  ctx.body = await booksService.getBook(id);
  ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
});

booksController.put("/:id", async (ctx) => {
  // #swagger.tags = ['Books']
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
});

booksController.delete("/:id", async (ctx) => {
  // #swagger.tags = ['Books']
  // #swagger.parameters['id'] = {}
  const id = validate(Joi.number(), ctx.params.id);
  ctx.body = await booksService.deleteBook(id);
  ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
});
