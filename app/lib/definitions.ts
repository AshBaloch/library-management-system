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

export type LatestTransaction = {
  id: string;
  name: string;
  department_title: string;
  semester_title: string;
  book_title: string;
};

export type TransactionsTable = {
  id: string;
  issue_date: string;
  return_date: string;
  is_returned: boolean;
  name: string;
  student_id: string;
  title: string;
  book_id: string;
  department_title: number;
};

export type StudentField = {
  id: string;
  name: string;
  fathers_name: string;
  department_title: string;
  program_title: string;
  semester_title: string;
  is_issued: boolean;
};

export type BookField = {
  id: string;
  title: string;
  author: string;
  available_quantity: string;
  category_title: string;
  total_quantity: number;
};

export type TransactionForm = {
  id: string;
  student_id: string;
  book_id: number;
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
  available_quantity: number;
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
