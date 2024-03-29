import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/students/table';
import { CreateButton } from '@/app/ui/transactions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { StudentsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchStudentsPages } from '@/app/lib/student-data';

export const metadata: Metadata = {
  title: 'Students',
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

  const totalPages = await fetchStudentsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Students</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search students..." />
        <CreateButton
          title="Register Student"
          href="/dashboard/students/create"
        />
      </div>
      <Suspense key={query + currentPage} fallback={<StudentsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
