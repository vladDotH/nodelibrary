import Router from "koa-router";
import { booksService } from "@/services/books.service";

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
  const body = ctx.request.body;
  ctx.body = await booksService.addBook(body as any);
  ctx.status = 200;
});

booksController.get("/", async (ctx) => {
  // #swagger.tags = ['Books']
  ctx.body = await booksService.getBooks();
  ctx.status = 200;
});

booksController.get("/:id", async (ctx) => {
  // #swagger.tags = ['Books']
  // #swagger.parameters['id'] = {}
  ctx.body = await booksService.getBook(ctx.params.id as any);
  ctx.status = 200;
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
  ctx.body = await booksService.updateBook(
    ctx.params.id as any,
    ctx.request.body as any,
  );
  ctx.status = 200;
});

booksController.delete("/:id", async (ctx) => {
  // #swagger.tags = ['Books']
  // #swagger.parameters['id'] = {}
  ctx.body = await booksService.deleteBook(ctx.params.id as any);
  ctx.status = 200;
});
