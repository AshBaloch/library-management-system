import Form from '@/app/ui/students/create-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { Metadata } from 'next';
import {
  fetchDepartments,
  fetchSemesters,
  fetchPrograms,
} from '@/app/lib/student-data';

export const metadata: Metadata = {
  title: 'Register Student',
};

export default async function Page() {
  const [departments, semesters, programs] = await Promise.all([
    fetchDepartments(),
    fetchSemesters(),
    fetchPrograms(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/students' },
          {
            label: 'Student Registration',
            href: '/dashboard/students/create',
            active: true,
          },
        ]}
      />
      <Form
        departments={departments}
        programs={programs}
        semesters={semesters}
      />
    </main>
  );
}
