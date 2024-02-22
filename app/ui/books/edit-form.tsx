'use client';

import { BookFormTable, CategoryForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { CreateButton } from '../invoices/buttons';
import { updateBook } from '@/app/lib/books-actions';

export default function EditBookForm({
  book,
  categories,
}: {
  book: BookFormTable;
  categories: CategoryForm[];
}) {
  const initialState = { message: null, errors: {} };
  const updateBookWithId = updateBook.bind(null, book.id);

  const [state, dispatch] = useFormState(updateBookWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Book Title */}
        <div className="mb-4">
          <label
            htmlFor="book_title"
            className="mb-2 block text-sm font-medium"
          >
            Title of the Book
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="book_title"
                name="book_title"
                type="text"
                placeholder="Enter title of the book"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                autoCapitalize="words"
                defaultValue={book.title}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Book Author */}
        <div className="mb-4">
          <label
            htmlFor="book-author"
            className="mb-2 block text-sm font-medium"
          >
            Author of the Book
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="book-author"
                name="book-author"
                type="text"
                placeholder="Enter author's name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="author-error"
                autoCapitalize="words"
                defaultValue={book.author}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="author-error" aria-live="polite" aria-atomic="true">
              {state.errors?.author &&
                state.errors.author.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Book Registration No. */}
        <div className="mb-4">
          <label
            htmlFor="registration_no"
            className="mb-2 block text-sm font-medium"
          >
            Registration No.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="registration_no"
                name="registration_no"
                type="text"
                placeholder="Enter registration number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="registration-error"
                autoCapitalize="words"
                defaultValue={book.registration_no}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="registration-error" aria-live="polite" aria-atomic="true">
              {state.errors?.registration_no &&
                state.errors.registration_no.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Book Publish date. */}
        <div className="mb-4">
          <label
            htmlFor="publish-date"
            className="mb-2 block text-sm font-medium"
          >
            Date of Publication
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="publish-date"
                name="publish-date"
                type="date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="publish-date-error"
                defaultValue={book.publish_date}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="publish-date-error" aria-live="polite" aria-atomic="true">
              {state.errors?.publish_date &&
                state.errors.publish_date.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Book Category */}
        <div className="mb-4 ">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose Category
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                id="category"
                name="category"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="category-error"
                defaultValue={book.category_id}
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_title}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <CreateButton
              title="Create Category"
              href="/dashboard/books/category/create"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category_id &&
              state.errors.category_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Total Quantity of Books */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Total Quantity of Books
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter total quantity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="quantity-error"
                step={1}
                defaultValue={book.total_quantity}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="quantity-error" aria-live="polite" aria-atomic="true">
              {state.errors?.total_quantity &&
                state.errors.total_quantity.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
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
          href="/dashboard/books"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Book</Button>
      </div>
    </form>
  );
}
