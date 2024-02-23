// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Ayesha',
    email: 'ash.asif1997@gmail.com',
    password: 'Ash.asif1997',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Asif Hassan',
    email: 'zainrahman642@gmail.com',
    password: 'asif@1234',
  },
];
const categories = [
  {
    id: '410544b2-4003-4271-9855-fec4b6c6442b',
    category_title: 'Computer Science',
  },
  {
    id: '410544b2-40c1-4271-9835-fec4b6a6442b',
    category_title: 'Botany',
  },
];

const books = [
  {
    id: '410544b2-4003-4271-9898-fec4b6c6442b',
    category_id: categories[0].id,
    title: 'New Book',
    author: 'Osama',
    registration_no: '85AF96',
    publish_date: '2022-06-05',
    total_quantity: 12,
  },
  {
    id: '440544b2-4003-4271-9898-fec4b6c6442b',
    category_id: categories[1].id,
    title: 'My BOok',
    author: 'Osama',
    registration_no: '85AF96',
    publish_date: '2022-06-05',
    total_quantity: 10,
  },
  {
    id: '420544b2-4003-4271-9898-fec4b6c6442b',
    category_id: categories[0].id,
    title: 'Book Three',
    author: 'Jamal',
    registration_no: '85AF96',
    publish_date: '2022-06-05',
    total_quantity: 6,
  },
];

const semesters = [
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a1',
    title: '1st Semester',
  },
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a2',
    title: '2nd Semester',
  },
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a3',
    title: '3rd Semester',
  },
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a4',
    title: '4th Semester',
  },
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a5',
    title: '5th Semester',
  },
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a6',
    title: '6th Semester',
  },
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a7',
    title: '7th Semester',
  },
  {
    id: '4105004a-4005-4271-9898-fec4b6c644a8',
    title: '8th Semester',
  },
];

const programs = [
  {
    id: '4105004a-4004-4271-9898-fec4b6c644d1',
    title: 'BS 4 years',
  },
  {
    id: '4105004a-4004-4271-9898-fec4b6c644d2',
    title: '2.5 years',
  },
  {
    id: '4105004a-4004-4271-9898-fec4b6c644d3',
    title: '2.0 years',
  },
  {
    id: '4105004a-4004-4271-9898-fec4b6c644d4',
    title: '1.5 years',
  },
];

const departments = [
  {
    id: '4105004a-4003-4271-9898-fec4b6c644d1',
    title: 'Computer Science',
  },
  {
    id: '4105004a-4003-4271-9898-fec4b6c644d2',
    title: 'English',
  },
  {
    id: '4105004a-4003-4271-9898-fec4b6c644d3',
    title: 'Education',
  },
  {
    id: '4105004a-4003-4271-9898-fec4b6c644d4',
    title: 'Botany',
  },
];

const students = [
  {
    id: '3958dc9e-752f-4377-85e9-fec4b6a6741a',
    name: 'Aslam Hassan',
    fathers_name: 'jamal Jan',
    cnic_no: '5230169864527',
    email: 'assif@gmail.com',
    address: 'tasp panjgur',
    contact: '03342386199',
    gender: 'MALE',
    department_id: departments[2].id,
    program_id: programs[2].id,
    semester_id: semesters[3].id,
  },
  {
    id: '3958dc9e-752f-4377-85e9-fec4b6a6742a',
    name: 'Jabbar',
    fathers_name: 'Shoku',
    cnic_no: '5230169864522',
    email: 'afsif@gmail.com',
    address: 'tasp panjgur',
    contact: '03342386199',
    gender: 'MALE',
    department_id: departments[2].id,
    program_id: programs[2].id,
    semester_id: semesters[3].id,
  },
  {
    id: '3958dc9e-752f-4377-85e9-fec4b6a6743a',
    name: 'ulfat',
    fathers_name: 'yaseen',
    cnic_no: '5230169874527',
    email: 'asisdff@gmail.com',
    address: 'tasp panjgur',
    contact: '03342386199',
    gender: 'MALE',
    department_id: departments[2].id,
    program_id: programs[2].id,
    semester_id: semesters[3].id,
  },
  {
    id: '3958dc9e-752f-4377-85e9-fec4b6a6744a',
    name: 'salman ',
    fathers_name: 'Salim Jan',
    cnic_no: '5230119864527',
    email: 'atrsif@gmail.com',
    address: 'tasp panjgur',
    contact: '03342386199',
    gender: 'MALE',
    department_id: departments[2].id,
    program_id: programs[2].id,
    semester_id: semesters[3].id,
  },
  {
    id: '3958dc9e-752f-4377-85e9-fec4b6a6745a',
    name: 'Samandar',
    fathers_name: 'Mousam',
    cnic_no: '5230169814527',
    email: 'asi45f@gmail.com',
    address: 'tasp panjgur',
    contact: '03342386199',
    gender: 'MALE',
    department_id: departments[2].id,
    program_id: programs[2].id,
    semester_id: semesters[3].id,
  },
  {
    id: '3958dc9e-752f-4377-85e9-fec4b6a6746a',
    name: 'Jabir',
    fathers_name: 'Ghafoor',
    cnic_no: '5230169844527',
    email: 'astrif@gmail.com',
    address: 'tasp panjgur',
    contact: '03342386199',
    gender: 'MALE',
    department_id: departments[2].id,
    program_id: programs[2].id,
    semester_id: semesters[3].id,
  },
  {
    id: '3958dc9e-752f-4377-85e9-fec4b6a6747a',
    name: 'Jameel',
    fathers_name: 'Shaqoor',
    cnic_no: '5230169866527',
    email: 'asiuiof@gmail.com',
    address: 'tasp panjgur',
    contact: '03342386199',
    gender: 'MALE',
    department_id: departments[2].id,
    program_id: programs[2].id,
    semester_id: semesters[3].id,
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const book_transactions = [
  {
    student_id: students[1].id,
    book_id: '278c377e-d263-482c-9f56-3e4cb488228b',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  categories,
  books,
  departments,
  semesters,
  programs,
  students,
  book_transactions,
};
