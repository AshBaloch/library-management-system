import Form from '@/app/ui/transactions/create-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { Metadata } from 'next';
import { fetchStudents } from '@/app/lib/student-data';
import { fetchBooks } from '@/app/lib/book-data';

export const metadata: Metadata = {
  title: 'Issue Book',
};

export default async function Page() {
  const [students, books] = await Promise.all([fetchStudents(), fetchBooks()]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books Transaction', href: '/dashboard/book-transactions' },
          {
            label: 'Issue Book',
            href: '/dashboard/book-transactions/create',
            active: true,
          },
        ]}
      />
      <Form books={books} students={students} />
    </main>
  );
}
