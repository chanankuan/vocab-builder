import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  email: Yup.string()
    .required('Email is a required field')
    .email('Invalid email format')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: Yup.string()
    .required('Password is a required field')
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password must be 7 characters long and include 6 letters and 1 digit.'
    ),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .email('Invalid email format')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: Yup.string().required('Password is a required field'),
});

export function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 4 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 2) {
    return [1, 2, 3, '...', totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 1, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}
