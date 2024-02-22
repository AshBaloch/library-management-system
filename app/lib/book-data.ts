import { sql } from '@vercel/postgres';
import {
  BookFormTable,
  BookTable,
  CategoryForm,
  InvoicesTable,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

// export async function fetchLatestInvoices() {
//   noStore();

//   try {
//     const data = await sql<LatestInvoiceRaw>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.rows.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }

// export async function fetchCardData() {
//   noStore();

//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//     const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

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
        books.total_quantity,
        categories.category_title
      FROM books
      JOIN categories ON books.category_id = categories.id
      WHERE
        categories.category_title ILIKE ${`%${query}%`} OR
        books.title::text ILIKE ${`%${query}%`} OR
        books.author::text ILIKE ${`%${query}%`} OR
        books.total_quantity::text ILIKE ${`%${query}%`} OR
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

// export async function fetchFilteredCustomers(query: string) {
//   noStore();

//   try {
//     const data = await sql<CustomersTableType>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

// export async function getUser(email: string) {
//   noStore();

//   try {
//     const user = await sql`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0] as User;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

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
