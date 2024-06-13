// src/components/Pagination.js
import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, setCurrentPage, totalComics }) => {
  const comicsPerPage = 40;
  const totalPages = Math.ceil(totalComics / comicsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <span>{currentPage}</span> / <span>{totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages || totalComics === 0}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
