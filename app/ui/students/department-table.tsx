import Image from 'next/image';
import { UpdateButton, DeleteContent } from '@/app/ui/invoices/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredDepartments } from '@/app/lib/student-data';
import { deleteDepartment } from '@/app/lib/students-actions';

export default async function DepartmentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const departments = await fetchFilteredDepartments(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
            {departments?.map((department) => (
              <div
                key={department.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-lg font-medium">{department.title}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateButton
                      href={`/dashboard/students/departments/${department.id}/edit`}
                    />
                    <DeleteContent
                      deleteAction={deleteDepartment.bind(null, department.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
