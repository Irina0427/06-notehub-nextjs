'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className={css.pagination}>
      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={`${css.pageButton} ${
            page === currentPage ? css.active : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
