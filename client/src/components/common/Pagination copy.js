import React from "react";
import { range } from "../../utils/range";
import { Link } from "react-router-dom";
import classNames from "classnames";

const PaginationItem = ({ page, currentPage }) => {
  const liClasses = classNames({
    "page-item": true,
    active: currentPage === page,
  });

  return (
    <li className={liClasses}>
      <Link to={`?page=${page}`} className="page-link ">
        {" "}
        {page}{" "}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, currentPage, pagination }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);
  return (
    <nav aria-label="Page navigation example ">
      <ul className="pagination  pagination-lg my-5   justify-content-center">
         {pagination && pagination.prev &&(
          <li>
            {" "}
            <Link to={`?page=${pagination.prev.page}`} className="page-link ">
              {" "}
              Prev
            </Link>
          </li>
        )} 

        {pages.map((page) => (
          <PaginationItem page={page} key={page} currentPage={currentPage} />
        ))}

         {pagination && pagination.next &&(
          <li>
            {" "}
            <Link to={`?page=${pagination.next.page}`} className="page-link ">
              {" "}
              Next
            </Link>
          </li>
        )} 
      </ul>
    </nav>
  );
};

export default Pagination;
