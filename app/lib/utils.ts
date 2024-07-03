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
    .email('Invalid email')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email'),
  password: Yup.string().required('Password is a required field'),
});
