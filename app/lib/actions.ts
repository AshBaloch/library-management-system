'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  student_id: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  book_id: z.string({
    invalid_type_error: 'Please select a Book.',
  }),
  issue_date: z.string(),
  return_date: z.string(),
  is_returned: z.boolean(),
});

export type State = {
  errors?: {
    student_id?: string[];
    book_id?: string[];
  };
  message?: string | null;
};

const IssueBook = FormSchema.omit({
  id: true,
  issue_date: true,
  return_date: true,
  is_returned: true,
});

export async function issueBook(prevState: State, formData: FormData) {
  const validatedFields = IssueBook.safeParse({
    student_id: formData.get('student'),
    book_id: formData.get('book'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Issue Book.',
    };
  }

  // Prepare data for insertion into the database
  const { book_id, student_id } = validatedFields.data;

  try {
    try {
      await sql`UPDATE books
      SET available_quantity = available_quantity - 1
      WHERE id = ${book_id};`;
    } catch (error) {
      return {
        message: 'Book Not Available',
      };
    }

    await sql`
    INSERT INTO book_transactions (student_id, book_id)
    VALUES (${student_id}, ${book_id})
    ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Issue Book.',
    };
  }

  revalidatePath('/dashboard/book-transactions');
  redirect('/dashboard/book-transactions');
}

// Use Zod to update the expected types
const UpdateBookTransaction = FormSchema.omit({
  id: true,
  issue_date: true,
  return_date: true,
  is_returned: true,
});

export async function updateBookTransaction(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateBookTransaction.safeParse({
    student_id: formData.get('student'),
    book_id: formData.get('book'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Issue Book.',
    };
  }

  // Prepare data for insertion into the database
  const { book_id, student_id } = validatedFields.data;

  try {
    await sql`
          UPDATE book_transactions
          SET student_id = ${student_id}, book_id = ${book_id}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Transaction.' };
  }

  revalidatePath('/dashboard/book-transactions');
  redirect('/dashboard/book-transactions');
}

export async function returnBookTransaction(id: string, book_id: string) {
  try {
    await sql`
      UPDATE book_transactions
      SET return_date = CURRENT_TIMESTAMP, is_returned = TRUE 
      WHERE id = ${id}
        `;
    await sql`UPDATE books
      SET available_quantity = available_quantity + 1
      WHERE id = ${book_id};`;

    revalidatePath('/dashboard/book-transactions');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function deleteBookTransaction(id: string, book_id: string) {
  try {
    await sql`DELETE FROM book_transactions WHERE id = ${id}`;
    await sql`UPDATE books
      SET available_quantity = available_quantity + 1
      WHERE id = ${book_id};`;
    revalidatePath('/dashboard/book-transactions');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
}
