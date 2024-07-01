import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email')
    .required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password must be 7 characters long, include at least 6 letters and 1 digit, and contain only letters and digits.'
    )
    .required('Required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email')
    .required('Required'),
  password: Yup.string().required(),
});
