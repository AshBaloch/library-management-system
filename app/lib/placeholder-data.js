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
  { id: '410544b2-4003-4271-9898-fec4b6c6442b', category_title: 'Fiction' },
  { id: '5cf5809f-75b8-4535-bc5e-61a4d3a90e77', category_title: 'Classics' },
  {
    id: '9323b43c-4e89-482d-af38-5af4b0f36a93',
    category_title: 'Science Fiction',
  },
];

const books = [
  {
    id: '410544b2-4003-4271-9898-fec4b6c6442b',
    category_id: categories[0].id,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    registration_no: '85AF96',
    publish_date: '1951-07-16',
    total_quantity: 12,
  },
  {
    id: '5cf5809f-75b8-4535-bc5e-61a4d3a90e77',
    category_id: categories[1].id,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    registration_no: '7F9D82',
    publish_date: '1960-07-11',
    total_quantity: 10,
  },
  {
    id: '9323b43c-4e89-482d-af38-5af4b0f36a93',
    category_id: categories[2].id,
    title: '1984',
    author: 'George Orwell',
    registration_no: '4B2E7A',
    publish_date: '1949-06-08',
    total_quantity: 8,
  },
  {
    id: '68d09a7e-08e5-4d80-8e0c-1ecf94cc295a',
    category_id: categories[0].id,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    registration_no: '1D3CFA',
    publish_date: '1925-04-10',
    total_quantity: 15,
  },
  {
    id: 'fe82c408-0e5d-4e10-938a-1a42d7405cdd',
    category_id: categories[1].id,
    title: 'Lord of the Flies',
    author: 'William Golding',
    registration_no: '3F7B56',
    publish_date: '1954-09-17',
    total_quantity: 20,
  },
  {
    id: '1e0d68c2-cf72-4f1c-b1f9-9f6e4c51fbb4',
    category_id: categories[2].id,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    registration_no: '6E8A1D',
    publish_date: '1932-05-17',
    total_quantity: 18,
  },
];

// You can now use the 'books' array as needed in your application.

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

module.exports = {
  users,
  categories,
  books,
  departments,
  semesters,
  programs,
  students,
};
