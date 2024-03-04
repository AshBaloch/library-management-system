import LatestInvoices from '@/app/ui/dashboard/latest-transactions';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { LatestTransactionsSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 ">
        <Suspense fallback={<LatestTransactionsSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
