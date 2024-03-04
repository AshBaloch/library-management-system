import { sql } from '@vercel/postgres';
import {
  BookField,
  BookFormTable,
  BookTable,
  CategoryForm,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredBooks(query: string, currentPage: number) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const books = await sql<BookTable>`
      SELECT
        books.id,
        books.title,
        books.author,
        books.registration_no,
        books.publish_date,
        books.available_quantity,
        categories.category_title
      FROM books
      JOIN categories ON books.category_id = categories.id
      WHERE
        categories.category_title ILIKE ${`%${query}%`} OR
        books.title::text ILIKE ${`%${query}%`} OR
        books.author::text ILIKE ${`%${query}%`} OR
        books.available_quantity::text ILIKE ${`%${query}%`} OR
        books.registration_no ILIKE ${`%${query}%`}
      ORDER BY books.title ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return books.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books.');
  }
}

export async function fetchBooksPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM books
    JOIN categories ON books.category_id = categories.id
    WHERE
    categories.category_title ILIKE ${`%${query}%`} OR
    books.title::text ILIKE ${`%${query}%`} OR
    books.author::text ILIKE ${`%${query}%`} OR
    books.total_quantity::text ILIKE ${`%${query}%`} OR
    books.registration_no ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of books.');
  }
}

export async function fetchBookById(id: string) {
  noStore();

  try {
    const data = await sql<BookFormTable>`
      SELECT
        books.id,
        books.title,
        books.author,
        books.registration_no,
        books.publish_date,
        books.total_quantity,
        books.category_id
      FROM books
      WHERE books.id = ${id};
    `;

    const book = data.rows;

    return book[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books.');
  }
}

export async function fetchBooks() {
  noStore();

  try {
    const data = await sql<BookField>`
    SELECT
    books.id,
    books.title,
    books.author,
    books.available_quantity,
    categories.category_title
  FROM books
  JOIN categories ON books.category_id = categories.id
      ORDER BY books.title ASC
    `;

    const books = data.rows;
    return books;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all books.');
  }
}
export async function fetchCategories() {
  noStore();

  try {
    const data = await sql<CategoryForm>`
      SELECT
        id,
        category_title
      FROM categories
      ORDER BY category_title ASC
    `;

    const category = data.rows;
    return category;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all category.');
  }
}

export async function fetchFilteredCategories(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const categories = await sql<CategoryForm>`
      SELECT
        categories.id,
        categories.category_title
      FROM categories
      WHERE
        categories.category_title ILIKE ${`%${query}%`} 
      ORDER BY categories.category_title ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchCategoriesPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM categories
    WHERE
    categories.category_title ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of books.');
  }
}

export async function fetchCategoryById(id: string) {
  noStore();

  try {
    const data = await sql<CategoryForm>`
      SELECT
        categories.id,
        categories.category_title
      FROM categories
      WHERE categories.id = ${id};
    `;

    const category = data.rows;

    return category[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}
