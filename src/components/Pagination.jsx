import React from "react";

const Pagination = ({ number, className, onClick }) => {
  const handleClick = (e) => {
    onClick(parseInt(e.target.textContent - 1));
  };
  return (
    <li className={`${className} pagination-number`} onClick={handleClick}>
      {number}
    </li>
  );
};

export default Pagination;
