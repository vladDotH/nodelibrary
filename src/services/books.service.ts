import { Book } from "@/types/Book";
import { db } from "@/util/db";

async function addBook(book: Book) {
  const res = await db.query(
    `insert into "Books"(title, author, publicationdate, genres)
     values ($1, $2, $3, $4)
     returning *`,
    [book.title, book.author, book.publicationDate, book.genres],
  );
  console.log(res.rows);
  return res.rows[0] ?? null;
}

async function getBooks() {
  const res = await db.query(
    `select *
     from "Books"`,
  );
  console.log(res.rows[0].genres);
  return res.rows;
}

async function getBook(id: number) {
  const res = await db.query(
    `select *
     from "Books" where id = $1`,
    [id],
  );
  return res.rows[0] ?? null;
}

async function updateBook(id: number, book: Book) {
  const res = await db.query(
    `update "Books"
     set title=$1,
         author=$2,
         publicationdate=$3,
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
  return res.rows[0] ?? null;
}

export const booksService = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
