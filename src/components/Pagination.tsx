import React, { SetStateAction } from 'react';
import classNames from 'classnames';

type Props = {
  pageCount: number;
  className: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  pageCount,
  className,
  currentPage,
  setCurrentPage
}) => {
  const getArrayFromNumber = (num: number) => {
    const result = [];

    for (let i = 1; i <= num; i++ ) {
      result.push(i);
    }

    return result;
  }

  return (
    <nav className={className}>
      <button
        className={classNames('pagination-previous', {
          'is-disabled': currentPage === 1,
        })}
        onClick={() => setCurrentPage(
          (prevPage) => prevPage === 1 ? prevPage : prevPage - 1
          )}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="pagination-next"
        onClick={() => setCurrentPage(
          (prevPage) => prevPage === pageCount ? prevPage : prevPage + 1
        )}
        disabled={currentPage === pageCount}
      >
        Next page
      </button>
      <ul className="pagination-list">
        {getArrayFromNumber(pageCount).map(page => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={classNames('pagination-link', {
                'is-current': currentPage === page,
              })}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
