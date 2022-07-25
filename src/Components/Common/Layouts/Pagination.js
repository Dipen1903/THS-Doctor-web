import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div className="col-md-12">
      <div className="pagination">
        <ul>
          {/* Left navigation arrow */}
          <li
            className={currentPage === 1 ? "disable" : ""}
            onClick={() => currentPage !== 1 && onPrevious()}
          >
            <a href="#!" onClick={(e) => e.preventDefault()}>
              Previous
            </a>
          </li>
          {paginationRange.map((pageNumber, i) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
              return (
                <li key={i} className="pagination-item dots">
                  <a href="#!" onClick={(e) => e.preventDefault()}>
                    &#8230;
                  </a>
                </li>
              );
            }

            // Render our Page Pills
            return (
              <li
                key={i}
                className={classnames({
                  active: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
              >
                <a href="#!" onClick={(e) => e.preventDefault()}>
                  {pageNumber}
                </a>
              </li>
            );
          })}
          {/*  Right Navigation arrow */}
          <li
            className={classnames({ disable: currentPage === lastPage })}
            onClick={() => currentPage !== lastPage && onNext()}
          >
            <a href="#!" onClick={(e) => e.preventDefault()}>
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
