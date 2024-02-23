// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type TransactionsTable = {
  id: string;
  issue_date: string;
  return_date: string;
  is_returned: boolean;
  name: string;
  title: string;
  book_id: string;
  department_title: number;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type StudentField = {
  id: string;
  name: string;
  fathers_name: string;
  department_title: string;
  program_title: string;
  semester_title: string;
};

export type BookField = {
  id: string;
  title: string;
  author: string;
  total_quantity: string;
  category_title: string;
};

export type TransactionForm = {
  id: string;
  student_id: string;
  book_id: number;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CategoryForm = {
  id: string;
  category_title: string;
};
export type DepartmentForm = {
  id: string;
  title: string;
};
export type SemesterForm = {
  id: string;
  title: string;
};
export type ProgramForm = {
  id: string;
  title: string;
};
export interface BookFormTable {
  id: string;
  category_id: string;
  title: string;
  author: string;
  registration_no: string;
  publish_date: string;
  total_quantity: number;
}

export interface BookTable extends BookFormTable {
  category_title: string;
}

export interface StudentFormTable {
  id: string;
  name: string;
  fathers_name: string;
  cnic_no: string;
  email: string;
  address: string;
  contact: string;
  gender: string;
  department_id: string;
  program_id: string;
  semester_id: string;
}
export interface StudentTable extends StudentFormTable {
  department_title: string;
  program_title: string;
  semester_title: string;
}
