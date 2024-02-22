import Image from 'next/image';
import { UpdateButton, DeleteContent } from '@/app/ui/invoices/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredBooks } from '@/app/lib/book-data';
import { deleteBook } from '@/app/lib/books-actions';

export default async function BooksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const books = await fetchFilteredBooks(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {books?.map((book) => (
              <div
                key={book.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{book.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                  {book.category_title}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{book.total_quantity}</p>
                    <p>{formatDateToLocal(book.publish_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateButton href={`/dashboard/books/${book.id}/edit`} />
                    <DeleteContent
                      deleteAction={deleteBook.bind(null, book.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Publish Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {books?.map((book) => (
                <tr
                  key={book.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{book.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{book.author}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {book.total_quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(book.publish_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {book.category_title}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateButton href={`/dashboard/books/${book.id}/edit`} />
                      <DeleteContent
                        deleteAction={deleteBook.bind(null, book.id)}
                      />
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
