'use client';

import {
  BookField,
  StudentField,
  TransactionForm,
} from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateBookTransaction } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditBookTransactionForm({
  transaction,
  students,
  books,
}: {
  transaction: TransactionForm;
  students: StudentField[];
  books: BookField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateBookTransactionWithId = updateBookTransaction.bind(
    null,
    transaction.id,
  );

  const [state, dispatch] = useFormState(
    updateBookTransactionWithId,
    initialState,
  );

  return (
    <form
      action={dispatch}
      id="edit-book-transaction-id"
      name="edit-book-transaction"
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
              defaultValue={transaction.student_id}
              aria-describedby="student-error"
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
              defaultValue={transaction.book_id}
              aria-describedby="book-error"
            >
              <option value="" disabled>
                Select a Book
              </option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} | {book.author} | {book.category_title} |{' '}
                  {book.total_quantity}
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
        <Button type="submit">Update Transaction</Button>
      </div>
    </form>
  );
}
