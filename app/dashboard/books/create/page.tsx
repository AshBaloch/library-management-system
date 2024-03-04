import Form from '@/app/ui/books/create-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { Metadata } from 'next';
import { fetchCategories } from '@/app/lib/book-data';

export const metadata: Metadata = {
  title: 'Create Book',
};

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          {
            label: 'Create Book',
            href: '/dashboard/books/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}
