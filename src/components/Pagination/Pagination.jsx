import React from 'react';
import { usePagination, DOTS } from './usePagination';
import './Pagination.css';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className='pagination-container'
    >
      <li
        className={currentPage === 1 ? 'pagination-item disabled' : 'pagination-item'}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={pageNumber === currentPage ? 'pagination-item selected' : 'pagination-item'}
            key={index}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={currentPage === lastPage ? 'pagination-item disabled' : 'pagination-item'}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;