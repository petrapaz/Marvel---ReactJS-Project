// src/components/Pagination.js
import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, setCurrentPage, totalComics }) => {
  const totalPages = Math.ceil(totalComics / 20);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        &lt; Previous
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
