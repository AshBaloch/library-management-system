const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  categories,
  books,
  departments,
  programs,
  semesters,
  students,
  book_transactions,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedBooksTransactions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS book_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    book_id UUID REFERENCES books(id),
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    is_returned BOOLEAN DEFAULT FALSE
  );
`;

    console.log(`Created "book_transactions" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedBooks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "books" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS books (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID REFERENCES categories(id),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    registration_no VARCHAR(255) NOT NULL,
    publish_date VARCHAR(255) NOT NULL,
    total_quantity INT NOT NULL CHECK (total_quantity >= 0),
    available_quantity INT NOT NULL CHECK (available_quantity >= 0 AND available_quantity <= total_quantity)
  );
`;

    console.log(`Created "Books" table`);

    // Insert data into the "Books" table
    const insertedBooks = await Promise.all(
      books.map(
        (book) => client.sql`
        INSERT INTO books (category_id, title, author, registration_no, publish_date, total_quantity, available_quantity)
        VALUES (${book.category_id}, ${book.title}, ${book.author}, ${book.registration_no}, ${book.publish_date}, ${book.total_quantity}, ${book.total_quantity})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedBooks.length} books`);

    return {
      createTable,
      books: insertedBooks,
    };
  } catch (error) {
    console.error('Error seeding books:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "categories" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        category_title VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "categories" table`);

    // Insert data into the "categories" table
    const insertedCategories = await Promise.all(
      categories.map(
        (category) => client.sql`
        INSERT INTO categories (id, category_title)
        VALUES (${category.id}, ${category.category_title})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

async function seedDepartments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "Departments" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS departments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      );
    `;
    console.log(`Created "departments" table`);

    // Insert data into the "departments" table
    const insertedDepartments = await Promise.all(
      departments.map(
        (department) => client.sql`
        INSERT INTO departments (id, title)
        VALUES (${department.id}, ${department.title})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );
    console.log(`Seeded ${insertedDepartments.length} departments`);

    return {
      createTable,
      departments: insertedDepartments,
    };
  } catch (error) {
    console.error('Error seeding departments:', error);
    throw error;
  }
}
async function seedPrograms(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "Programs" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS programs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      );
    `;
    console.log(`Created "programs" table`);

    // Insert data into the "programs" table
    const insertedPrograms = await Promise.all(
      programs.map(
        (program) => client.sql`
        INSERT INTO programs (id, title)
        VALUES (${program.id}, ${program.title})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );
    console.log(`Seeded ${insertedPrograms.length} programs`);

    return {
      createTable,
      programs: insertedPrograms,
    };
  } catch (error) {
    console.error('Error seeding programs:', error);
    throw error;
  }
}

async function seedSemesters(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "Semesters" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS semesters (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      );
    `;
    console.log(`Created "semesters" table`);

    // Insert data into the "semesters" table
    const insertedSemesters = await Promise.all(
      semesters.map(
        (semester) => client.sql`
        INSERT INTO semesters (id, title)
        VALUES (${semester.id}, ${semester.title})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );
    console.log(`Seeded ${insertedSemesters.length} semesters`);

    return {
      createTable,
      semesters: insertedSemesters,
    };
  } catch (error) {
    console.error('Error seeding semesters:', error);
    throw error;
  }
}

async function seedStudents(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "Semesters" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS students (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        fathers_name VARCHAR(255) NOT NULL,
        cnic_no VARCHAR(15) NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        address TEXT NOT NULL,
        contact VARCHAR(255) NOT NULL,
        gender TEXT NOT NULL,
        department_id UUID REFERENCES departments(id),
        program_id UUID REFERENCES programs(id),
        semester_id UUID REFERENCES semesters(id)
      );
    `;
    console.log(`Created "students" table`);

    // Insert data into the "students" table
    const insertedStudents = await Promise.all(
      students.map(
        (student) => client.sql`
        INSERT INTO students (id, name, fathers_name, cnic_no, email, address, contact, gender, department_id, program_id, semester_id)
        VALUES (${student.id}, ${student.name}, ${student.fathers_name}, ${student.cnic_no},${student.email},${student.address},${student.contact},${student.gender}, ${student.department_id}, ${student.program_id}, ${student.semester_id} )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );
    console.log(`Seeded ${insertedStudents.length} students`);

    return {
      createTable,
      students: insertedStudents,
    };
  } catch (error) {
    console.error('Error seeding students:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedDepartments(client);
  await seedSemesters(client);
  await seedPrograms(client);
  await seedCategories(client);
  await seedStudents(client);
  await seedBooks(client);
  await seedBooksTransactions(client);
  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
