'use client';

import Link from 'next/link';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createCategory } from '@/app/lib/books-actions';

export default function Form() {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createCategory, initialState);

  return (
    <form action={dispatch} id="category-form-id" name="category-form">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category Title */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Enter Category"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                autoCapitalize="words"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.category_title &&
                state.errors?.category_title.map((error: string) => (
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
          href="/dashboard/books/create"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Category</Button>
      </div>
    </form>
  );
}
