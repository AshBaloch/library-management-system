import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/students/department-table';
import { CreateButton } from '@/app/ui/transactions/buttons';
import { TransactionMobileSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchDepartmentsPages } from '@/app/lib/student-data';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';

export const metadata: Metadata = {
  title: 'Departments',
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

  const totalPages = await fetchDepartmentsPages(query);

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/students' },
          {
            label: 'Departments',
            href: '/dashboard/students/departments',
            active: true,
          },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search departments..." />
        <CreateButton
          title="Create Department"
          href="/dashboard/students/departments/create"
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
