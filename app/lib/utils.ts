import * as Yup from 'yup';
import { toast, ToastContent, ToastOptions, Id, Bounce } from 'react-toastify';

import { enRegex, uaRegex } from './constants';

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

export const CreateWordSchema = Yup.object().shape({
  en: Yup.string()
    .matches(enRegex)
    .required('This field is required')
    .test(
      'is-irregular-format',
      'Must be in the format form-II form-III form',
      function (value) {
        const { isIrregular } = this.parent;
        if (isIrregular) {
          // Check if the value matches the pattern word-word-word
          return /^[a-zA-Z]+-[a-zA-Z]+-[a-zA-Z]+$/.test(value);
        }
        // If isIrregular is not true, skip this test
        return true;
      }
    ),
  ua: Yup.string().matches(uaRegex).required('This field is required'),
  category: Yup.string().required('This field is required'),
  isIrregular: Yup.boolean()
    .nullable()
    .test('isIrregular', 'This field is required', function (value) {
      const { category } = this.parent;
      if (category === 'verb') {
        // Ensure isIrregular is either true or false (i.e., a boolean)
        return value === true || value === false;
      }
      // If category is not 'verb', consider the field valid regardless of its value
      return true;
    }),
});

export const EditWordSchema = Yup.object().shape({
  en: Yup.string()
    .matches(enRegex)
    .required('This field is required')
    .test(
      'is-irregular-format',
      'Must be in the format form-II form-III form',
      function (value) {
        const { isIrregular } = this.parent;
        if (isIrregular) {
          // Check if the value matches the pattern word-word-word
          return /^[a-zA-Z]+-[a-zA-Z]+-[a-zA-Z]+$/.test(value);
        }
        // If isIrregular is not true, skip this test
        return true;
      }
    ),
  ua: Yup.string().matches(uaRegex).required('This field is required'),
  category: Yup.string().required('This field is required'),
  isIrregular: Yup.boolean()
    .nullable()
    .test('isIrregular', 'This field is required', function (value) {
      const { category } = this.parent;
      if (category === 'verb') {
        // Ensure isIrregular is either true or false (i.e., a boolean)
        return value === true || value === false;
      }
      // If category is not 'verb', consider the field valid regardless of its value
      return true;
    }),
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

export function removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != '')
  ) as Partial<T>;
}

export const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Bounce,
};

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */
export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case 'success':
      return toast.success(content, optionsToApply);
    case 'error':
      return toast.error(content, optionsToApply);
    case 'info':
      return toast.info(content, optionsToApply);
    case 'warning':
      return toast.warn(content, optionsToApply);
    case 'default':
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};
