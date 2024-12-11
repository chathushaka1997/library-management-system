import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import { Book } from "../models/book.model";
import { useEffect, useState } from "react";
import useBook from "../hooks/useBook";
import Loader from "../components/Loader";

function formatDateToYMD(dateString: string) {
    const date = new Date(dateString)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0'); // Days are 1-based

    return `${year}-${month}-${day}`;
}

const EditBookPage: React.FC = () => {
    const { id } = useParams();
    const { getBookById, error, updateBookHandler } = useBook()
    const [initialValues, setInitialValues] = useState<Book | undefined>()

    useEffect(() => {
        if (id) {
            const book = getBookById(id)
            if (book)
                setInitialValues({ ...book, publicationDate: formatDateToYMD(book.publicationDate) })
        }
    }, [id, getBookById])

    const handleUpdateBook = async (values: Partial<Book>) => {
        if (id && values)
            await updateBookHandler(id, values)
    };

    return <>{initialValues ? <BookForm initialValues={initialValues} onSubmit={handleUpdateBook} error={error} /> : <Loader />}</>;
};

export default EditBookPage;