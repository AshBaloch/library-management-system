'use client';

import { BookField, StudentField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { issueBook } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function Form({
  students,
  books,
}: {
  students: StudentField[];
  books: BookField[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(issueBook, initialState);

  const [selectedStudent, setSelectedStudent] = useState<StudentField>();
  const [selectedBook, setSelectedBook] = useState<BookField>();

  return (
    <form
      action={dispatch}
      id="create-transaction-id"
      name="create-transaction"
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Student Name */}
        <div className="mb-4">
          <label htmlFor="student" className="mb-2 block text-sm font-medium">
            Choose student
          </label>
          <div className="relative">
            <select
              id="student"
              name="student"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="student-error"
              onChange={(e) =>
                setSelectedStudent(
                  students.filter((s) => s.id === e.target.value)[0],
                )
              }
            >
              <option value="" disabled>
                Select a Student
              </option>
              {students.map((student) => (
                <option key={student.id} value={student.id} className="flex">
                  {student.name} | {student.fathers_name} |{' '}
                  {student.department_title} | {student.program_title} |{' '}
                  {student.semester_title}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="student-error" aria-live="polite" aria-atomic="true">
            {state.errors?.student_id &&
              state.errors.student_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            {selectedStudent && selectedStudent.is_issued && (
              <p className="mt-2 text-sm text-red-500">
                This student Already has a book.
              </p>
            )}
          </div>
        </div>

        {/* Book Name */}
        <div className="mb-4">
          <label htmlFor="book" className="mb-2 block text-sm font-medium">
            Choose Book
          </label>
          <div className="relative flex-1">
            <select
              id="book"
              name="book"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="book-error"
              onChange={(e) =>
                setSelectedBook(books.filter((s) => s.id === e.target.value)[0])
              }
              disabled={selectedStudent && selectedStudent.is_issued}
            >
              <option value="" disabled>
                Select a Book
              </option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} | {book.author} | {book.category_title} |{' '}
                  {book.available_quantity}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="book-error" aria-live="polite" aria-atomic="true">
            {state.errors?.book_id &&
              state.errors?.book_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}

            {selectedBook && Number(selectedBook.available_quantity) === 0 && (
              <p className="mt-2 text-sm text-red-500">Not Available.</p>
            )}
          </div>
        </div>
        {state.message && (
          <p className="mt-2 text-sm text-red-500" key={state.message}>
            {state.message}
          </p>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/book-transactions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          aria-disabled={selectedStudent && selectedStudent.is_issued}
        >
          Issue Book
        </Button>
      </div>
      <div className="mt-8 lg:flex">
        {selectedStudent && (
          <div className="w-full rounded-md bg-gray-50 p-3 md:flex md:flex-wrap">
            {/* Student Name */}
            <div className="mb-4   md:w-1/2">
              <p className="mb-1 block text-xs ">Student Name</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">{selectedStudent.name}</p>
              </div>
            </div>
            {/* Student Name */}
            <div className="mb-4 md:w-1/2">
              <p className="mb-2 block text-xs ">Father&apos;s Name</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">
                  {selectedStudent.fathers_name}
                </p>
              </div>
            </div>
            {/* Student Name */}
            <div className="mb-4 md:w-1/2">
              <p className="mb-2 block text-xs ">Department</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">
                  {selectedStudent.department_title}
                </p>
              </div>
            </div>
            {/* Student Name */}
            <div className="mb-4 md:w-1/2">
              <p className="mb-2 block text-xs ">Program</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">
                  {selectedStudent.program_title}
                </p>
              </div>
            </div>
            {/* Student Name */}
            <div className="mb-4 md:w-1/2">
              <p className="mb-2 block text-xs ">Semester</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">
                  {selectedStudent.semester_title}
                </p>
              </div>
            </div>
            {/* Student Name */}
            {selectedStudent.is_issued && (
              <div className="mb-4 md:w-1/2">
                <p className="mb-2 block text-xs ">Status</p>
                <div className="flex items-center  ">
                  <p className="text-lg font-medium text-red-500">
                    Already has a book
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        {selectedBook && (
          <div className="rounded-md  bg-gray-50 p-3 max-lg:mt-4 lg:ml-4 lg:w-2/5">
            {/* Student Name */}
            <div className="mb-4  ">
              <p className="mb-1 text-sm">Book Title</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">{selectedBook.title}</p>
              </div>
            </div>
            {/* Student Name */}
            <div className="mb-4">
              <p className="mb-1 text-sm">Author</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">{selectedBook.author}</p>
              </div>
            </div>
            {/* Student Name */}
            <div className="mb-4">
              <p className="mb-1 text-sm">Category</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">
                  {selectedBook.category_title}
                </p>
              </div>
            </div>
            {/* Student Name */}
            <div className="mb-4">
              <p className="mb-1 text-sm">Available Quantity</p>
              <div className="flex items-center  ">
                <p className="text-lg font-medium">
                  {selectedBook.available_quantity}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
