import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot be more than 20 characters long')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[\^$*.[\]{}()?"!@#%&/,><':;|_~`]/,
      'Password must contain at least one special character'
    )
    .max(50, 'Password cannot be more than 50 characters long'),
  role: yup
    .string()
    .required('Role is required')
    .oneOf(
      ['Requester', 'SysAdmin', 'Helpdesk Agent'],
      'Invalid role selected'
    ),
});
