import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

interface RegisterValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const initialValues: RegisterValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), "", undefined], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register: React.FC = () => {
    const { register, error } = useAuth()
    const handleSubmit = async (values: RegisterValues) => {
        await register(values)
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <div className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                className="mt-1 p-2 border rounded w-full"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 p-2 border rounded w-full"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="mt-1 p-2 border rounded w-full"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="flex justify-center mt-5">
                <Link className="text-center text-blue-500" to={"/login"}>
                    Goto login
                </Link>
            </div>
        </div>
    );
};

export default Register;