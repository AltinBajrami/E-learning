import React from 'react';
import rightArrowIcon from '../../../assets/images/right-arrow.png';
import leftArrowIcon from '../../../assets/images/left-arrow.png';
import "./Pagination.scss";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {

  const renderPageNumbers = (pageCount, currentPage) => {
    const pages = [];
    const range = 1; // Number of pages to display around the current page
    const margin = 2; // Number of pages to display at the beginning and end

    // Add the first two pages
    for (let i = 1; i <= margin; i++) {
      if (i <= pageCount) {
        pages.push(i);
      }
    }

    // Add dots if there is a gap between the first pages and the current range
    if (currentPage > margin + range + 1) {
      pages.push('...');
    }

    // Add the range around the current page
    for (let i = Math.max(currentPage - range, margin + 1); i <= Math.min(currentPage + range, pageCount - margin); i++) {
      pages.push(i);
    }

    // Add dots if there is a gap between the current range and the last pages
    if (currentPage < pageCount - margin - range) {
      pages.push('...');
    }

    // Add the last two pages
    for (let i = pageCount - margin + 1; i <= pageCount; i++) {
      if (i > margin) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePageClick = (data) => {
    onPageChange(data);
  };

  const pageNumbers = renderPageNumbers(pageCount, currentPage + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageClick({ selected: Math.max(currentPage - 1, 0) })}
        className={`centered pagination-previous ${currentPage === 0 ? 'pagination-disabled' : ''}`}
        disabled={currentPage === 0}
      >
        <img src={leftArrowIcon} alt="Previous" className="arrow" /> 
        <p className='text'>Previous</p>
      </button>
      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={index} className="break-me">...</span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageClick({ selected: page - 1 })}
            className={`pagination-page ${page === currentPage + 1 ? 'active' : ''}`}
          >
            {page}
          </button>
        )
      )}
      <div className="pagination-info">
        <span className="current-page">{currentPage + 1}</span>
        <span className="page-count">/{pageCount}</span>
      </div>
      <button
        onClick={() => handlePageClick({ selected: Math.min(currentPage + 1, pageCount - 1) })}
        className={`centered pagination-next ${currentPage === pageCount - 1 ? 'pagination-disabled' : ''}`}
        disabled={currentPage === pageCount - 1}
      >
        <p className='text'>Next</p>
        <img src={rightArrowIcon} alt="Next" className="arrow" />
      </button>
    </div>
  );
};

export default Pagination;
