import Form from '@/app/ui/books/create-category-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Category',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          { label: 'Categories', href: '/dashboard/books/category' },
          {
            label: 'Create Category',
            href: '/dashboard/books/category/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
