'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  category_title: z
    .string({
      invalid_type_error: 'Please Enter a Category.',
    })
    .min(4, { message: 'Please Enter a Category' }),
});

export type State = {
  errors?: {
    category_title?: string[];
  };
  message?: string | null;
};

const CreateCategory = FormSchema.omit({ id: true });

export async function createCategory(prevState: State, formData: FormData) {
  const validatedFields = CreateCategory.safeParse({
    category_title: formData.get('category'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  // Prepare data for insertion into the database
  const { category_title } = validatedFields.data;

  try {
    await sql`
        INSERT INTO categories (category_title)
        VALUES (${category_title})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
    };
  }

  revalidatePath('/dashboard/books/category');
  redirect('/dashboard/books/category');
}

// Use Zod to update the expected types
const UpdateCategory = FormSchema.omit({ id: true });

export async function updateCategory(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateCategory.safeParse({
    category_title: formData.get('category'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  // Prepare data for insertion into the database
  const { category_title } = validatedFields.data;

  try {
    await sql`
          UPDATE categories
          SET 
          category_title = ${category_title}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Category.' };
  }

  revalidatePath('/dashboard/books/category');
  redirect('/dashboard/books/category');
}

export async function deleteCategory(id: string) {
  try {
    await sql`DELETE FROM categories WHERE id = ${id}`;
    revalidatePath('/dashboard/books/category');
    return { message: 'Deleted Category.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category.' };
  }
}

const BookFormSchema = z.object({
  id: z.string(),
  title: z
    .string({
      invalid_type_error: 'Please Enter a Title.',
    })
    .min(4, 'Title must be at least 4 characters'),
  author: z
    .string({
      invalid_type_error: "Please Enter Author's name.",
    })
    .min(4, 'Authors name must be at least 4 characters'),
  registration_no: z
    .string({
      invalid_type_error: 'Please Enter Registration Number of the Book.',
    })
    .min(4, 'Registration Number is required'),
  publish_date: z
    .string({
      invalid_type_error: 'Please Enter Publish Date of the Book.',
    })
    .refine((data) => !!data, { message: 'Required' }),
  category_id: z.string({
    invalid_type_error: 'Please select category of the Book.',
  }),
  total_quantity: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
});

export type BookState = {
  errors?: {
    category_id?: string[];
    title?: string[];
    author?: string[];
    registration_no?: string[];
    total_quantity?: string[];
    publish_date?: string[];
  };
  message?: string | null;
};

const CreateBook = BookFormSchema.omit({ id: true });

export async function createBook(prevState: BookState, formData: FormData) {
  const validatedFields = CreateBook.safeParse({
    title: formData.get('book_title'),
    author: formData.get('book-author'),
    registration_no: formData.get('registration_no'),
    publish_date: formData.get('publish-date'),
    category_id: formData.get('category'),
    total_quantity: formData.get('quantity'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Book.',
    };
  }

  // Prepare data for insertion into the database
  const {
    title,
    author,
    category_id,
    publish_date,
    registration_no,
    total_quantity,
  } = validatedFields.data;

  try {
    await sql`
    INSERT INTO books (category_id, title, author, registration_no, publish_date, total_quantity)
    VALUES (${category_id}, ${title}, ${author}, ${registration_no}, ${publish_date}, ${total_quantity})
    ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
    };
  }

  revalidatePath('/dashboard/books');
  redirect('/dashboard/books');
}

// Use Zod to update the expected types
const UpdateBook = BookFormSchema.omit({ id: true });

export async function updateBook(
  id: string,
  prevState: BookState,
  formData: FormData,
) {
  const validatedFields = UpdateBook.safeParse({
    title: formData.get('book_title'),
    author: formData.get('book-author'),
    registration_no: formData.get('registration_no'),
    publish_date: formData.get('publish-date'),
    category_id: formData.get('category'),
    total_quantity: formData.get('quantity'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Book.',
    };
  }

  // Prepare data for insertion into the database
  const {
    title,
    author,
    category_id,
    publish_date,
    registration_no,
    total_quantity,
  } = validatedFields.data;

  try {
    await sql`
          UPDATE books
          SET 
          category_id = ${category_id}, 
          title = ${title}, 
          author = ${author}, 
          registration_no = ${registration_no}, 
          publish_date = ${publish_date}, 
          total_quantity = ${total_quantity}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Book.' };
  }

  revalidatePath('/dashboard/books');
  redirect('/dashboard/books');
}

export async function deleteBook(id: string) {
  try {
    await sql`DELETE FROM books WHERE id = ${id}`;
    revalidatePath('/dashboard/books');
    return { message: 'Deleted Book.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Book.' };
  }
}
