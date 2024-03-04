import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/books/category-table';
import { CreateButton } from '@/app/ui/transactions/buttons';
import { TransactionMobileSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchCategoriesPages } from '@/app/lib/book-data';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCategoriesPages(query);

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          {
            label: 'Categories',
            href: '/dashboard/books/category',
            active: true,
          },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Categories..." />
        <CreateButton
          title="Create Category"
          href="/dashboard/books/category/create"
        />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TransactionMobileSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
