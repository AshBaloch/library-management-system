'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z
    .string({
      invalid_type_error: 'Please Enter a Department.',
    })
    .min(4, { message: 'Please Enter a Department' }),
});

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateDepartment = FormSchema.omit({ id: true });

export async function createDepartment(prevState: State, formData: FormData) {
  const validatedFields = CreateDepartment.safeParse({
    title: formData.get('department'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Department.',
    };
  }

  // Prepare data for insertion into the database
  const { title } = validatedFields.data;

  try {
    await sql`
        INSERT INTO departments (title)
        VALUES (${title})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Department.',
    };
  }

  revalidatePath('/dashboard/students/departments');
  redirect('/dashboard/students/departments');
}

// Use Zod to update the expected types
const UpdateDepartment = FormSchema.omit({ id: true });

export async function updateDepartment(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateDepartment.safeParse({
    title: formData.get('department'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Department.',
    };
  }

  // Prepare data for insertion into the database
  const { title } = validatedFields.data;

  try {
    await sql`
          UPDATE departments
          SET 
          title = ${title}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Department.' };
  }

  revalidatePath('/dashboard/students/departments');
  redirect('/dashboard/students/departments');
}

export async function deleteDepartment(id: string) {
  try {
    await sql`DELETE FROM departments WHERE id = ${id}`;
    revalidatePath('/dashboard/students/departments');
    return { message: 'Deleted Department.' };
  } catch (error) {
    return {
      message:
        'Database Error: Failed to Delete Department.\nThis department has students linked to it.',
    };
  }
}

const StudentFormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      invalid_type_error: 'Please Enter a Name.',
    })
    .min(4, 'Name must be at least 4 characters'),
  fathers_name: z
    .string({
      invalid_type_error: 'Please Enter fathers name.',
    })
    .min(4, 'Fathers name must be at least 4 characters'),
  cnic_no: z
    .string({
      invalid_type_error: 'Please Enter CNIC Number of the Student.',
    })
    .length(13, 'Enter 13 digit CNIC without dashes(-)'),
  address: z
    .string({
      invalid_type_error: 'Please Enter Address of the Student.',
    })
    .min(4, 'Address is required'),
  contact: z
    .string({
      invalid_type_error: 'Please Enter contact information of the Student.',
    })
    .min(4, 'Contact Information is required'),
  gender: z.string({
    invalid_type_error: 'Please Select a Gender',
  }),
  email: z
    .string({
      invalid_type_error: 'Please Enter Email address.',
    })
    .email()
    .refine((data) => !!data, { message: 'Required' }),
  department_id: z.string({
    invalid_type_error: 'Please select department of the Student.',
  }),
  program_id: z.string({
    invalid_type_error: 'Please select program of the Student.',
  }),
  semester_id: z.string({
    invalid_type_error: 'Please select semester of the Student.',
  }),
});

export type StudentState = {
  errors?: {
    name?: string[];
    fathers_name?: string[];
    cnic_no?: string[];
    address?: string[];
    email?: string[];
    contact?: string[];
    gender?: string[];
    department_id?: string[];
    program_id?: string[];
    semester_id?: string[];
  };
  message?: string | null;
};

const CreateStudent = StudentFormSchema.omit({ id: true });

export async function createStudent(
  prevState: StudentState,
  formData: FormData,
) {
  const validatedFields = CreateStudent.safeParse({
    name: formData.get('student_name'),
    fathers_name: formData.get('fathers_name'),
    cnic_no: formData.get('cnic_no'),
    email: formData.get('email'),
    contact: formData.get('contact'),
    address: formData.get('address'),
    gender: formData.get('gender'),
    department_id: formData.get('department'),
    program_id: formData.get('program'),
    semester_id: formData.get('semester'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Student.',
    };
  }

  // Prepare data for insertion into the database
  const {
    name,
    fathers_name,
    email,
    address,
    cnic_no,
    contact,
    department_id,
    gender,
    semester_id,
    program_id,
  } = validatedFields.data;

  try {
    await sql`
    INSERT INTO students (name, fathers_name, email, cnic_no, address, contact, gender, department_id, program_id, semester_id)
    VALUES (${name}, ${fathers_name}, ${email}, ${cnic_no}, ${address}, ${contact}, ${gender}, ${department_id}, ${program_id}, ${semester_id})
    ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Register Student.',
    };
  }

  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

// Use Zod to update the expected types
const UpdateStudent = StudentFormSchema.omit({ id: true });

export async function updateStudent(
  id: string,
  prevState: StudentState,
  formData: FormData,
) {
  const validatedFields = CreateStudent.safeParse({
    name: formData.get('student_name'),
    fathers_name: formData.get('fathers_name'),
    cnic_no: formData.get('cnic_no'),
    email: formData.get('email'),
    contact: formData.get('contact'),
    address: formData.get('address'),
    gender: formData.get('gender'),
    department_id: formData.get('department'),
    program_id: formData.get('program'),
    semester_id: formData.get('semester'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Student.',
    };
  }

  // Prepare data for insertion into the database
  const {
    name,
    fathers_name,
    email,
    address,
    cnic_no,
    contact,
    department_id,
    gender,
    semester_id,
    program_id,
  } = validatedFields.data;

  try {
    await sql`
          UPDATE students
          SET
          name = ${name},
          fathers_name = ${fathers_name},
          cnic_no = ${cnic_no},
          email = ${email},
          address = ${address},
          contact = ${contact},
          gender = ${gender},
          department_id = ${department_id},
          program_id = ${program_id},
          semester_id = ${semester_id}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Student.' };
  }

  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

export async function deleteStudent(id: string) {
  try {
    await sql`DELETE FROM students WHERE id = ${id}`;
    revalidatePath('/dashboard/students');
    return { message: 'Deleted Student.' };
  } catch (error) {
    return {
      message: 'Failed to Delete Student.\nStudent may have a book history.',
    };
  }
}
