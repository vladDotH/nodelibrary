import Joi from "joi";
import { Book } from "@/types/Book";

export const BookDto = Joi.object<Book>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publicationDate: Joi.date().required(),
  genres: Joi.array().items(Joi.string()).default([]),
});
