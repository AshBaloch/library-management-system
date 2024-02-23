import Form from '@/app/ui/books/edit-category-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCategoryById } from '@/app/lib/book-data';

export const metadata: Metadata = {
  title: 'Edit Category',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const category = await fetchCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          { label: 'Categories', href: '/dashboard/books/category' },
          {
            label: 'Edit Book',
            href: `/dashboard/books/category/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form category={category} />
    </main>
  );
}
