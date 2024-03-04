import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/transactions/table';
import { CreateButton } from '@/app/ui/transactions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { BooksTransactionTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTransactionsPages } from '@/app/lib/transactions-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transactions',
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

  const totalPages = await fetchTransactionsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Book Transactions</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search transactions..." />
        <CreateButton
          title="Issue Book"
          href="/dashboard/book-transactions/create"
        />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<BooksTransactionTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
