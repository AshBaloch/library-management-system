import Form from '@/app/ui/students/create-department-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Department',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/students' },
          { label: 'Departments', href: '/dashboard/students/departments' },
          {
            label: 'Add Department',
            href: '/dashboard/students/departments/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
