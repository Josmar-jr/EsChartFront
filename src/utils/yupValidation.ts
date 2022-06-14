import { object, string, ref } from 'yup';

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const baseValidation = {
  email: string().email().required(),
  password: string()
    .matches(lowercaseRegex, 'One lowercase require')
    .matches(uppercaseRegex, 'One uppercase required!')
    .matches(numericRegex, 'One numeric required!')
    .min(8, 'Minimum 8 characters required!')
    .required('required')
};

export const loginSchema = object({
  ...baseValidation
}).required();

export const signUpSchema = object({
  ...baseValidation,
  name: string()
    .min(3, 'O minimo de caracteres são 3')
    .max(20, 'O máximo de caracteres são 20')
    .required(),
  confirmPassword: string()
    .oneOf([ref('password'), 'Senhas não conferem'], 'Senhas não conferem')
    .required('required')
}).required();

export const forgotSchema = object({
  email: baseValidation.email
}).required();
