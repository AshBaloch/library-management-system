import Form from '@/app/ui/books/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchBookById, fetchCategories } from '@/app/lib/book-data';

export const metadata: Metadata = {
  title: 'Edit Book',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [book, categories] = await Promise.all([
    fetchBookById(id),
    fetchCategories(),
  ]);

  if (!book) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          {
            label: 'Edit Book',
            href: `/dashboard/books/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form book={book} categories={categories} />
    </main>
  );
}
