import { sql } from '@vercel/postgres';
import { User, LatestTransaction } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchLatestTransactions() {
  noStore();

  try {
    const data = await sql<LatestTransaction>`
      SELECT students.name, departments.title AS department_title, semesters.title AS semester_title, books.title AS book_title
      FROM book_transactions
        JOIN students ON book_transactions.student_id = students.id
        JOIN departments ON students.department_id = departments.id
        JOIN semesters ON students.semester_id = semesters.id
        JOIN books ON book_transactions.book_id = books.id
      ORDER BY 
      CASE 
        WHEN book_transactions.return_date IS NOT NULL THEN return_date
        ELSE issue_date
      END DESC
      LIMIT 5`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest transactions.');
  }
}

export async function fetchCardData() {
  noStore();

  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const books_transactionCountPromise = sql`SELECT COUNT(*) FROM book_transactions`;
    const booksCountPromise = sql`SELECT SUM(total_quantity) AS total_books_quantity FROM books`;
    const studentsCountPromise = sql`SELECT COUNT(*) FROM students`;
    const book_transactionStatusPromise = sql`SELECT COUNT(*) FROM book_transactions WHERE is_returned = true;`;

    const data = await Promise.all([
      books_transactionCountPromise,
      booksCountPromise,
      book_transactionStatusPromise,
      studentsCountPromise,
    ]);

    const totalIssuedBooks = Number(data[0].rows[0].count ?? '0');
    const numberOfBooks = Number(data[1].rows[0].total_books_quantity ?? '0');
    const totalReturnedBooks = Number(data[2].rows[0].count ?? '0');
    const totalStudents = Number(data[3].rows[0].count ?? '0');

    return {
      numberOfBooks,
      totalIssuedBooks,
      totalReturnedBooks,
      totalStudents,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function getUser(email: string) {
  noStore();

  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
