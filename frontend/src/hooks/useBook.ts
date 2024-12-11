import { useEffect, useState } from "react";
import { Book } from "../models/book.model";
import { createBook, deleteBook, getBooks, updateBook } from "../lib/api";
import { navigate } from "../config/navigation";



const useBook = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        getAllBooksHandler()
    }, [])


    const createBookHandler = async (data: Omit<Book, '_id'>) => {
        setLoading(true)
        try {
            const response = await createBook(data);
            setBooks(prevState => [...prevState, response.data]);
            if (navigate) {
                navigate("/")
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                const errorMessage = err.message || 'An unknown error occurred'
                setError(errorMessage);
                return
            }
            setError("Internal server error");
        } finally {
            setLoading(false)
        }
    };

    const getAllBooksHandler = async () => {
        setLoading(true)
        try {
            const response = await getBooks();
            console.log(response);
            
            setBooks(response.data.books);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                const errorMessage = err.message || 'An unknown error occurred'
                setError(errorMessage);
                return
            }
            setError("Internal server error");
        } finally {
            setLoading(false)
        }
    };

    const updateBookHandler = async (id: string, data: Partial<Book>) => {
        setLoading(true)
        try {
            const response = await updateBook(id, data);
            setBooks(prevState => [...prevState, response.data]);
            if (navigate) {
                navigate("/")
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                const errorMessage = err.message || 'An unknown error occurred'
                setError(errorMessage);
                return
            }
            setError("Internal server error");
        } finally {
            setLoading(false)
        }
    };
    const deleteBookHandler = async (id: string) => {
        setLoading(true)
        try {
            await deleteBook(id);
            setBooks(prevState => prevState.filter(book => book._id !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                const errorMessage = err.message || 'An unknown error occurred'
                setError(errorMessage);
                return
            }
            setError("Internal server error");
        } finally {
            setLoading(false)
        }
    };

    const getBookById = (id: string) => {
        return books.find(book => book._id === id)
    }



    return { createBookHandler, error, loading, books, updateBookHandler, deleteBookHandler, getBookById }

}

export default useBook