import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useFormik } from 'formik';
import { loginInput, registerInput } from '@/schema';

const AuthForm = ({ showField, mutate }) => {
    const initialValues = showField ? { fullName: '', email: '', password: '', terms:false } : { email: '', password: '' };
    const validationSchema = showField ? registerInput : loginInput;

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            mutate(values);
        },
    });

    return (
        <Card className='border-none shadow-none p-3 md:px-12'>
            <form className='space-y-6' onSubmit={handleSubmit}>
                {showField && (
                    <div className="flex flex-col">
                        <label htmlFor="fullName" className='font-semibold'>Name</label>
                        <Input
                            type='text'
                            name='fullName'
                            className='bg-[#E8F0FE] border-none'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                        />
                        {errors.fullName && touched.fullName ? (
                            <p className='text-red-600 font-medium text-[0.7em] ps-2'>{errors.fullName}</p>
                        ) : ''}
                    </div>
                )}
                <div className="flex flex-col">
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <Input
                        type='email'
                        name='email'
                        className='bg-[#E8F0FE] border-none'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                    />
                    {errors.email && touched.email ? (
                        <p className='text-red-600 text-[0.7em] ps-2 font-medium'>{errors.email}</p>
                    ) : ''}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <Input
                        type='password'
                        name='password'
                        className='bg-[#E8F0FE] border-none'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                    />
                    {errors.password && touched.password ? (
                        <p className='text-red-600 font-medium text-[0.7em] ps-2'>{errors.password}</p>
                    ) : ''}
                </div>
                {showField && (
                    <div className='flex flex-col'>
                    <div className="flex items-center ps-1 space-x-4">
                        <Input
                            type='checkbox'
                            name='terms'
                            className='w-5'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="terms" className='font-medium'>
                            Agree with <span className='text-blue-400'>Terms & Condition</span>
                        </label>
                      
                    </div>
                      {errors.terms && touched.terms ? (
                        <p className='text-red-600 font-medium text-[0.7em] ps-2'>{errors.terms}</p>
                    ) : ''}
                    </div>
                )}
                <Button type='submit' className='bg-blue-800 text-white font-bold w-full rounded-full hover:bg-blue-950 '>
                    {showField ? 'Register' : 'Login'}
                </Button>
            </form>
        </Card>
    );
};

export default AuthForm;
