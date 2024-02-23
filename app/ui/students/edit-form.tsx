'use client';

import {
  DepartmentForm,
  ProgramForm,
  SemesterForm,
  StudentFormTable,
} from '@/app/lib/definitions';
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
import { updateStudent } from '@/app/lib/students-actions';

export default function EditBookForm({
  student,
  departments,
  programs,
  semesters,
}: {
  student: StudentFormTable;
  departments: DepartmentForm[];
  programs: ProgramForm[];
  semesters: SemesterForm[];
}) {
  const initialState = { message: null, errors: {} };
  const updateStudentWithId = updateStudent.bind(null, student.id);

  const [state, dispatch] = useFormState(updateStudentWithId, initialState);

  console.log('state: ', state);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Student Name */}
        <div className="mb-4">
          <label
            htmlFor="student_name"
            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="student_name"
                name="student_name"
                type="text"
                placeholder="Student's name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="student-name-error"
                autoCapitalize="words"
                defaultValue={student.name}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="student-name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Father's Name */}
        <div className="mb-4">
          <label
            htmlFor="fathers_name"
            className="mb-2 block text-sm font-medium"
          >
            Father&apos;s Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fathers_name"
                name="fathers_name"
                type="text"
                placeholder="Father's name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="father-name-error"
                autoCapitalize="words"
                defaultValue={student.fathers_name}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="father-name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.fathers_name &&
                state.errors.fathers_name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* CNIC No. */}
        <div className="mb-4">
          <label htmlFor="cnic_no" className="mb-2 block text-sm font-medium">
            CNIC Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cnic_no"
                name="cnic_no"
                type="number"
                placeholder="5230178868895"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cnic-error"
                defaultValue={student.cnic_no}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="cnic-error" aria-live="polite" aria-atomic="true">
              {state.errors?.cnic_no &&
                state.errors.cnic_no.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ayesha@example.com"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                autoCapitalize="words"
                defaultValue={student.email}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="address-error"
                autoCapitalize="words"
                defaultValue={student.address}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="address-error" aria-live="polite" aria-atomic="true">
              {state.errors?.address &&
                state.errors.address.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label htmlFor="contact" className="mb-2 block text-sm font-medium">
            Contact
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="contact"
                name="contact"
                type="number"
                placeholder="03********"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="contact-error"
                autoCapitalize="words"
                defaultValue={student.contact}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="contact-error" aria-live="polite" aria-atomic="true">
              {state.errors?.contact &&
                state.errors.contact.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4 ">
          <label htmlFor="gender" className="mb-2 block text-sm font-medium">
            Gender
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                id="gender"
                name="gender"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="gender-error"
                defaultValue={student.gender}
              >
                <option key={1} value="MALE">
                  MALE
                </option>
                <option key={2} value="FEMALE">
                  FEMALE
                </option>
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="gender-error" aria-live="polite" aria-atomic="true">
            {state.errors?.gender &&
              state.errors.gender.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Department */}
        <div className="mb-4 ">
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-medium"
          >
            Choose Department
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                id="department"
                name="department"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="department-error"
                defaultValue={student.department_id}
              >
                <option value="" disabled>
                  Select a Department
                </option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.title}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <CreateButton
              title="Create Department"
              href="/dashboard/students/departments/create"
            />
          </div>
          <div id="department-error" aria-live="polite" aria-atomic="true">
            {state.errors?.department_id &&
              state.errors.department_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Program */}
        <div className="mb-4 ">
          <label htmlFor="program" className="mb-2 block text-sm font-medium">
            Choose Program
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                id="program"
                name="program"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="program-error"
                defaultValue={student.program_id}
              >
                <option value="" disabled>
                  Select a Program
                </option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.title}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="program-error" aria-live="polite" aria-atomic="true">
            {state.errors?.program_id &&
              state.errors.program_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Semester */}
        <div className="mb-4 ">
          <label htmlFor="semester" className="mb-2 block text-sm font-medium">
            Choose Semester
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                id="semester"
                name="semester"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="semester-error"
                defaultValue={student.semester_id}
              >
                <option value="" disabled>
                  Select a Semester
                </option>
                {semesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.title}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="semester-error" aria-live="polite" aria-atomic="true">
            {state.errors?.semester_id &&
              state.errors.semester_id.map((error: string) => (
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
          href="/dashboard/students"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Student</Button>
      </div>
    </form>
  );
}
