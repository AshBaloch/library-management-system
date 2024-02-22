import Image from 'next/image';
import { UpdateButton, DeleteContent } from '@/app/ui/invoices/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import {
  fetchFilteredBooks,
  fetchFilteredCategories,
} from '@/app/lib/book-data';
import { deleteCategory } from '@/app/lib/books-actions';

export default async function CategoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await fetchFilteredCategories(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
            {categories?.map((category) => (
              <div
                key={category.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-lg font-medium">
                      {category.category_title}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateButton
                      href={`/dashboard/books/category/${category.id}/edit`}
                    />
                    <DeleteContent
                      deleteAction={deleteCategory.bind(null, category.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
