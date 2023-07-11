import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup.string().required('Name cannot be empty!'),
    email: yup.string().email().required('email address is required!'),
    password: yup.string().min(6).max(32).required('Password is required!'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 
    'Password must match!')
});

export const resetPassSchema = yup.object().shape({
    password: yup.string().min(6).max(32).required('Password is required!'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 
    'Password must match!')
});