// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../pics/logo.png';
import SearchBar from './SearchBar';

const Header: React.FC<{ search: string, handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ search, handleSearchChange, handleSortChange }) => {
  return (
    <header className="bg-gray-900 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Marvel Comics" className="h-8 mr-2" />
          <span className="text-xl font-bold">Marvel Comics</span>
        </Link>
        <div className="flex items-center space-x-4">
          <SearchBar search={search} handleSearchChange={handleSearchChange} />
          <select
            onChange={handleSortChange}
            className="bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="random">Random</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
