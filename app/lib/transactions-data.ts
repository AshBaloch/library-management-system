import { sql } from '@vercel/postgres';
import { TransactionsTable, TransactionForm } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTransactions(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const book_transactions = await sql<TransactionsTable>`
      SELECT
        book_transactions.id,
        book_transactions.issue_date,
        book_transactions.book_id,
        book_transactions.return_date,
        book_transactions.is_returned,
        students.id AS student_id,
        students.name,
        books.title,
        departments.title AS department_title
      FROM 
        book_transactions
      JOIN 
        students ON book_transactions.student_id = students.id
      JOIN 
        departments ON students.department_id = departments.id
      JOIN 
        books ON book_transactions.book_id = books.id
      WHERE
      students.name ILIKE ${`%${query}%`} OR
      departments.title ILIKE ${`%${query}%`} OR
        books.title::text ILIKE ${`%${query}%`} OR
        book_transactions.issue_date::text ILIKE ${`%${query}%`} OR
        book_transactions.return_date::text ILIKE ${`%${query}%`} 
      ORDER BY book_transactions.issue_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return book_transactions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch book_transactions.');
  }
}

export async function fetchTransactionsPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM 
        book_transactions
      JOIN 
        students ON book_transactions.student_id = students.id
      JOIN 
        departments ON students.department_id = departments.id
      JOIN 
        books ON book_transactions.book_id = books.id
    WHERE
    students.name ILIKE ${`%${query}%`} OR
    departments.title ILIKE ${`%${query}%`} OR
      books.title::text ILIKE ${`%${query}%`} OR
      book_transactions.issue_date::text ILIKE ${`%${query}%`} OR
      book_transactions.return_date::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Transactions.');
  }
}

export async function fetchTransactionById(id: string) {
  noStore();

  try {
    const data = await sql<TransactionForm>`
      SELECT
        book_transactions.id,
        book_transactions.student_id,
        book_transactions.book_id
      FROM book_transactions
      WHERE book_transactions.id = ${id};
    `;

    const transaction = data.rows;

    return transaction[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaction.');
  }
}
