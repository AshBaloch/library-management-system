import Form from '@/app/ui/students/edit-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  fetchStudentById,
  fetchDepartments,
  fetchPrograms,
  fetchSemesters,
} from '@/app/lib/student-data';

export const metadata: Metadata = {
  title: 'Edit Student',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [student, departments, semesters, programs] = await Promise.all([
    fetchStudentById(id),
    fetchDepartments(),
    fetchSemesters(),
    fetchPrograms(),
  ]);

  if (!student) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/students' },
          {
            label: 'Edit Student',
            href: `/dashboard/students/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        departments={departments}
        programs={programs}
        semesters={semesters}
        student={student}
      />
    </main>
  );
}
