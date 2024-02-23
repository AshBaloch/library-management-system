'use client';

import { DepartmentForm, CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { updateDepartment } from '@/app/lib/students-actions';

export default function Form({ department }: { department: DepartmentForm }) {
  const initialState = { message: null, errors: {} };
  const updateDepartmentWithId = updateDepartment.bind(null, department.id);

  const [state, dispatch] = useFormState(updateDepartmentWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Department Title */}
        <div className="mb-4">
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-medium"
          >
            Department Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="department"
                name="department"
                type="text"
                placeholder="Enter Department"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                autoCapitalize="words"
                defaultValue={department.title}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors?.title.map((error: string) => (
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
        <Button type="submit">Update Department</Button>
      </div>
    </form>
  );
}
