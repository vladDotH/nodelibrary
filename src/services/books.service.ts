import { Book } from "@/types/book";
import { db } from "@/util/db";

async function addBook(book: Book) {
  const res = await db.query(
    `insert into "Books"(title, author, "publicationDate", genres)
     values ($1, $2, $3, $4)
     returning *`,
    [book.title, book.author, book.publicationDate, book.genres],
  );

  return (res.rows[0] ?? null) as Book | null;
}

async function getBooks() {
  const res = await db.query(
    `select *
     from "Books"`,
  );
  return res.rows as Book[];
}

async function getBook(id: number) {
  const res = await db.query(
    `select *
     from "Books" where id = $1`,
    [id],
  );
  return (res.rows[0] ?? null) as Book | null;
}

async function updateBook(id: number, book: Book) {
  const res = await db.query(
    `update "Books"
     set title=$1,
         author=$2,
         "publicationDate"=$3,
         genres=$4
     where id = $5 returning *`,
    [book.title, book.author, book.publicationDate, book.genres, id],
  );
  return res.rows[0] ?? null;
}

async function deleteBook(id: number) {
  const res = await db.query(
    `delete
     from "Books"
     where id = $1
     RETURNING *`,
    [id],
  );
  return (res.rows[0] ?? null) as Book | null;
}

export const booksService = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
