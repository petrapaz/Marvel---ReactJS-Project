// src/components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, handleSearchChange }) => {
  return (
    <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Search for comics..."
      className="p-2 rounded border border-gray-300 text-black" // Tailwind classes for styling
    />
  );
};

export default SearchBar;
