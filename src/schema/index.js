
import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registerInput = yup.object().shape({
    email:yup.string().email('Enter Valid Email').required('Email is Required'),
    terms: yup.bool().oneOf([true], 'Agree to our Terms & Conditions'),
    password:yup.string().matches(passwordRules,{message: 'Enter Strong Password'}).required('Password is required')
});

export const  loginInput = yup.object().shape({
    email: yup.string().email('Enter Valid Email').required('Email is Required'),
    password: yup.string().required('Password is required')
})

export const profileSchema = yup.object().shape({
    name: yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required'),
    phone: yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be digits only')
      .min(10, 'Phone number must be at least 10 digits long')
      .required('Phone number is required'),
      gender: yup.string()
      .oneOf(['male', 'female'], 'Please select a valid gender')
      .required('Gender is required'),
  });