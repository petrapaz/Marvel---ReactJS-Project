import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../pics/logo.png'; // Adjust the path to your logo image
import '../styles/index.css'; // Ensure Tailwind CSS is imported

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="header-content flex justify-between items-center">
        <div className="logo-search-container flex items-center">
          <Link to="/" className="logo-link mr-4">
            <img src={logo} alt="Marvel Logo" className="logo h-10" />
          </Link>
          <input 
            type="text" 
            placeholder="Search for comics..." 
            className="p-2 rounded border border-gray-300 w-full max-w-xs"
          />
        </div>
        <Link to="/" className="back-to-home text-white">
          Back to Homepage
        </Link>
      </div>
    </header>
  );
};

export default Header;
