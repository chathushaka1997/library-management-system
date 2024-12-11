import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold"><Link to="/">Book Management</Link></h1>
      <div className="flex items-center space-x-4">
        <span className="text-lg">Welcome, {username}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
