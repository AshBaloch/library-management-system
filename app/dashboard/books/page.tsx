import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/books/table';
import { CreateButton } from '@/app/ui/transactions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { BooksTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchBooksPages } from '@/app/lib/book-data';

export const metadata: Metadata = {
  title: 'Books',
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

  const totalPages = await fetchBooksPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Books</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search books..." />
        <CreateButton title="Add Book" href="/dashboard/books/create" />
      </div>
      <Suspense key={query + currentPage} fallback={<BooksTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
