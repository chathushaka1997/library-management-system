// src/components/BookForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Book } from '../models/book.model';
import BackButton from './BackButton';



interface BookFormProps {
    initialValues?: Omit<Book, '_id'>;
    onSubmit: (values: Omit<Book, '_id'>) => void;
    error: string | null
}

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    genre: Yup.string().required('Genre is required'),
    publicationDate: Yup.date().required('Publication Date is required'),
});

const BookForm: React.FC<BookFormProps> = ({ initialValues, onSubmit, error }) => {
    return (
        <><div className="max-w-md mx-auto mt-20">
            <BackButton />
        </div>
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {initialValues ? 'Update Book' : 'Add New Book'}
                </h2>
                {error && <div className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>}
                <Formik
                    initialValues={
                        initialValues || { title: '', author: '', genre: '', publicationDate: '' }
                    }
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="mt-1 p-2 border rounded w-full"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                    Author
                                </label>
                                <Field
                                    type="text"
                                    id="author"
                                    name="author"
                                    className="mt-1 p-2 border rounded w-full"
                                />
                                <ErrorMessage name="author" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                                    Genre
                                </label>
                                <Field
                                    type="text"
                                    id="genre"
                                    name="genre"
                                    className="mt-1 p-2 border rounded w-full"
                                />
                                <ErrorMessage name="genre" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">
                                    Publication Date
                                </label>
                                <Field
                                    type="date"
                                    id="publicationDate"
                                    name="publicationDate"
                                    className="mt-1 p-2 border rounded w-full"
                                />
                                <ErrorMessage name="publicationDate" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (initialValues ? 'Updating...' : 'Adding...') : (initialValues ? 'Update Book' : 'Add Book')}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default BookForm;
