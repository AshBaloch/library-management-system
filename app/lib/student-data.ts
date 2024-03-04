import { sql } from '@vercel/postgres';
import {
  DepartmentForm,
  ProgramForm,
  SemesterForm,
  StudentField,
  StudentFormTable,
  StudentTable,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredStudents(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const students = await sql<StudentTable>`
    SELECT
        students.id,
        students.name,
        students.fathers_name,
        students.cnic_no,
        students.email,
        students.address,
        students.contact,
        students.gender,
        departments.title AS department_title,
        programs.title AS program_title,
        semesters.title AS semester_title
      FROM
          students
      JOIN
          departments ON students.department_id = departments.id
      JOIN
          programs ON students.program_id = programs.id
      JOIN
          semesters ON students.semester_id = semesters.id
      WHERE
        departments.title ILIKE ${`%${query}%`} OR
        programs.title ILIKE ${`%${query}%`} OR
        semesters.title ILIKE ${`%${query}%`} OR
        students.name::text ILIKE ${`%${query}%`} OR
        students.fathers_name::text ILIKE ${`%${query}%`} OR
        students.cnic_no::text ILIKE ${`%${query}%`} 
      ORDER BY students.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return students.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch students.');
  }
}

export async function fetchStudentsPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM
          students
      JOIN
          departments ON students.department_id = departments.id
      JOIN
          programs ON students.program_id = programs.id
      JOIN
          semesters ON students.semester_id = semesters.id
    WHERE
      departments.title ILIKE ${`%${query}%`} OR
      programs.title ILIKE ${`%${query}%`} OR
      semesters.title ILIKE ${`%${query}%`} OR
      students.name::text ILIKE ${`%${query}%`} OR
      students.fathers_name::text ILIKE ${`%${query}%`} OR
      students.cnic_no::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of students.');
  }
}

export async function fetchStudentById(id: string) {
  noStore();

  try {
    const data = await sql<StudentFormTable>`
      SELECT
        students.id,
        students.name,
        students.fathers_name,
        students.cnic_no,
        students.email,
        students.address,
        students.contact,
        students.gender,
        students.department_id,
        students.program_id,
        students.semester_id
      FROM students
      WHERE students.id = ${id};
    `;

    const book = data.rows;

    return book[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch students.');
  }
}

export async function fetchStudents() {
  noStore();

  try {
    const data = await sql<StudentField>`
    SELECT
      students.id,
      students.name,
      students.fathers_name,
      students.is_issued,
      departments.title AS department_title,
      programs.title AS program_title,
      semesters.title AS semester_title
  FROM
      students
  JOIN
      departments ON students.department_id = departments.id
  JOIN
      programs ON students.program_id = programs.id
  JOIN
      semesters ON students.semester_id = semesters.id
      ORDER BY students.name ASC
    `;

    const students = data.rows;
    return students;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all students.');
  }
}

export async function fetchDepartments() {
  noStore();

  try {
    const data = await sql<DepartmentForm>`
      SELECT
        id,
        title
      FROM departments
      ORDER BY title ASC
    `;

    const department = data.rows;
    return department;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all departments.');
  }
}

export async function fetchSemesters() {
  noStore();

  try {
    const data = await sql<SemesterForm>`
      SELECT
        id,
        title
      FROM semesters
      ORDER BY title ASC
    `;

    const semesters = data.rows;
    return semesters;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all semesters.');
  }
}

export async function fetchPrograms() {
  noStore();

  try {
    const data = await sql<ProgramForm>`
      SELECT
        id,
        title
      FROM programs
      ORDER BY title ASC
    `;

    const program = data.rows;
    return program;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all programs.');
  }
}

export async function fetchFilteredDepartments(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const departments = await sql<DepartmentForm>`
      SELECT
        departments.id,
        departments.title
      FROM departments
      WHERE
        departments.title ILIKE ${`%${query}%`} 
      ORDER BY departments.title ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return departments.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch departments.');
  }
}

export async function fetchDepartmentsPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM departments
    WHERE
    departments.title ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of students.');
  }
}

export async function fetchDepartmentById(id: string) {
  noStore();

  try {
    const data = await sql<DepartmentForm>`
      SELECT
        departments.id,
        departments.title
      FROM departments
      WHERE departments.id = ${id};
    `;

    const category = data.rows;

    return category[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch departments.');
  }
}
