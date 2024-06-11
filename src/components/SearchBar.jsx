// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ search, handleSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search for comics..."
      value={search}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;