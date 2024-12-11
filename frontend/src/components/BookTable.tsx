import React from 'react';
import { Book } from '../models/book.model';
import { Link } from 'react-router-dom';



interface BookTableProps {
  books: Book[];
  onDelete: (id: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onDelete }) => {
  return (
    <div className="w-100 mx-auto  text-left">
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Title</th>
            <th className="py-2 px-4 border-b border-gray-200">Author</th>
            <th className="py-2 px-4 border-b border-gray-200">Genre</th>
            <th className="py-2 px-4 border-b border-gray-200">Publication Date</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td className="py-2 px-4 border-b border-gray-200">{book.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{book.author}</td>
                <td className="py-2 px-4 border-b border-gray-200">{book.genre}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(book.publicationDate).toLocaleDateString('en-CA')}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => onDelete(book._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                  <Link to={`/edit/${book._id}`}
                    className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-600">
                No books available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
