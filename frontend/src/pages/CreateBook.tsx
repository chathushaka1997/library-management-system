import React from 'react';
import BookForm from '../components/BookForm';
import { Book } from '../models/book.model';
import useBook from '../hooks/useBook';

const CreateBookPage: React.FC = () => {
    const { createBookHandler, error } = useBook()
    const handleAddBook = async (values: Omit<Book, '_id'>) => {
        await createBookHandler(values)
    };

    return <BookForm onSubmit={handleAddBook} error={error}/>;
};

export default CreateBookPage;