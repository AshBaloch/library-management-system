import { UpdateButton, DeleteContent } from '@/app/ui/transactions/buttons';
import { fetchFilteredStudents } from '@/app/lib/student-data';
import { deleteDepartment, deleteStudent } from '@/app/lib/students-actions';

export default async function BooksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const students = await fetchFilteredStudents(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {students?.map((student) => (
              <div
                key={student.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{student.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {student.fathers_name}
                    </p>
                  </div>
                  {student.cnic_no}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {student.department_title}
                    </p>
                    <p>{student.semester_title}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateButton
                      href={`/dashboard/students/${student.id}/edit`}
                    />
                    <DeleteContent
                      deleteAction={deleteDepartment.bind(null, student.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Father&apos;s Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  CNIC Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Department
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Semester
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {students?.map((student) => (
                <tr
                  key={student.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{student.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {student.fathers_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {student.cnic_no}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {student.department_title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {student.semester_title}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateButton
                        href={`/dashboard/students/${student.id}/edit`}
                      />
                      <DeleteContent
                        deleteAction={deleteStudent.bind(null, student.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
