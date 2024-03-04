import {
  UpdateButton,
  DeleteContent,
  ReturnBookButton,
} from '@/app/ui/transactions/buttons';
import InvoiceStatus from '@/app/ui/transactions/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredTransactions } from '@/app/lib/transactions-data';
import {
  deleteBookTransaction,
  returnBookTransaction,
} from '@/app/lib/actions';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const book_transactions = await fetchFilteredTransactions(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {book_transactions?.map((transaction, index) => (
              <div key={index} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="text-sm">{transaction.name}</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      {transaction.department_title}
                    </p>
                  </div>
                  <div className="flex items-center text-center text-xs">
                    <p>{transaction.title}</p>
                  </div>
                  <InvoiceStatus status={transaction.is_returned} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className=" text-xs font-medium">
                      Issued: {formatDateToLocal(transaction.issue_date)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {!transaction.is_returned ? (
                      <>
                        <ReturnBookButton
                          returnBookAction={returnBookTransaction.bind(
                            null,
                            transaction.id,
                            transaction.book_id,
                            transaction.student_id,
                          )}
                        />
                        <UpdateButton
                          href={`/dashboard/book-transactions/${transaction.id}/edit`}
                        />

                        <DeleteContent
                          deleteAction={deleteBookTransaction.bind(
                            null,
                            transaction.id,
                            transaction.book_id,
                          )}
                        />
                      </>
                    ) : (
                      <p className=" text-xs font-medium">
                        Returned: {formatDateToLocal(transaction.return_date)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Department
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Book Title
                </th>
                <th scope="col" className="px-3 py-5 text-center font-medium">
                  Issue Date
                </th>
                <th scope="col" className="px-3 py-5 text-center font-medium">
                  Return Date
                </th>
                <th scope="col" className="px-3 py-5 text-center font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="py-3 pl-6 pr-3 text-center font-medium"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {book_transactions?.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{transaction.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.department_title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {formatDateToLocal(transaction.issue_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {transaction.return_date
                      ? formatDateToLocal(transaction.return_date)
                      : '---'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    <InvoiceStatus status={transaction.is_returned} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-3 pr-3">
                    <div className="flex justify-end gap-3">
                      {transaction.is_returned || (
                        <>
                          <ReturnBookButton
                            returnBookAction={returnBookTransaction.bind(
                              null,
                              transaction.id,
                              transaction.book_id,
                              transaction.student_id,
                            )}
                          />
                          <UpdateButton
                            href={`/dashboard/book-transactions/${transaction.id}/edit`}
                          />
                          <DeleteContent
                            deleteAction={deleteBookTransaction.bind(
                              null,
                              transaction.id,
                              transaction.book_id,
                            )}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
