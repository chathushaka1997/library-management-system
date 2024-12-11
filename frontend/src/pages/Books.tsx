// src/pages/BooksPage.tsx
import React from 'react';
import BookTable from '../components/BookTable';
import { Link } from 'react-router-dom';
import useBook from '../hooks/useBook';


const BooksPage: React.FC = () => {
  const {books,deleteBookHandler} = useBook();

  const handleDelete = async (id: string) => {
    console.log(id);
    await deleteBookHandler(id)
  };

  return (
    <div className="p-6">
      <div className="flex justify-center items-center mb-6 w-100">
        <div style={{maxWidth:"1200px",width:"100%"}}>
          <div className="flex justify-between items-center mb-6 ">
            <h2 className="text-3xl font-bold text-center">Book List</h2>
            <Link to="/create">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create new book
              </button>
            </Link>
          </div>
          <BookTable books={books} onDelete={handleDelete} />
        </div>

      </div>

    </div>
  );
};

export default BooksPage;
