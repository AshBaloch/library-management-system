import Form from '@/app/ui/transactions/edit-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchStudents } from '@/app/lib/student-data';
import { fetchBooks } from '@/app/lib/book-data';
import { fetchTransactionById } from '@/app/lib/transactions-data';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [transaction, students, books] = await Promise.all([
    fetchTransactionById(id),
    fetchStudents(),
    fetchBooks(),
  ]);

  if (!transaction) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/book-transactions' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/book-transactions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form transaction={transaction} students={students} books={books} />
    </main>
  );
}
