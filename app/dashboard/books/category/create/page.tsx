import Form from '@/app/ui/books/create-category-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          {
            label: 'Add Category',
            href: '/dashboard/books/category/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
