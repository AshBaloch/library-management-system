import Form from '@/app/ui/students/edit-department-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchDepartmentById } from '@/app/lib/student-data';

export const metadata: Metadata = {
  title: 'Edit Department',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const department = await fetchDepartmentById(id);

  if (!department) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/students' },
          { label: 'Departments', href: '/dashboard/students/departments' },
          {
            label: 'Edit Department',
            href: `/dashboard/students/departments/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form department={department} />
    </main>
  );
}
