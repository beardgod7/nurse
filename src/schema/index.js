
import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerInput = yup.object().shape({
    fullName: yup.string().min(8).required('Name is Required'),
    email:yup.string().email('Enter Valid Email').required('Email is Required'),
    terms: yup.bool().oneOf([true], 'Agree to our Terms & Conditions'),
    password:yup.string().matches(passwordRules,{message: 'Enter Strong Password'}).required('Password is required')
});

export const  loginInput = yup.object().shape({
    email: yup.string().email('Enter Valid Email').required('Email is Required'),
    password: yup.string().required('Password is required')
})