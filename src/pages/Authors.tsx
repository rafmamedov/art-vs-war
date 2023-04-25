import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { AuthorList } from '../components/AuthorList';
import { Author } from '../types/painting';
import './Authors.scss';
import axios from 'axios';

const GETALLAUTHORS = 'https://www.albedosunrise.com/authors?';

export const Authors = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorsCount, setAuthorsCount] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const defaultPerPage = `page=${currentPage - 1}&pageSize=${perPage}`;

  const getAllAuthorsFromServer = useCallback(async () => {
    await axios.get(GETALLAUTHORS + defaultPerPage)
      .then((response) => {
        setAuthors(response.data.authors);
        setPageCount(response.data.page.totalPages);
        setAuthorsCount(response.data.page.totalElements)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300);
      })
  }, [defaultPerPage]);

  useEffect(() => {
    getAllAuthorsFromServer();
  }, [perPage, defaultPerPage, getAllAuthorsFromServer]);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+event.target.value);
  };

  return (
    <section className="section authors">
      <div className="authors-header title is-3">
        {!isFetching && `Authors: ${authorsCount}`}
      </div>

      {isFetching
        ? <Loader />
        : (
          <>
            <div className="authors-container">
              <div className="sorting">
                <div className="sorting-container">
                  <div className="sorting-title">Per page:</div>
                  <select
                    className="perpage dropdown"
                    onChange={handlePerPageChange}
                    value={perPage}
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                  </select>
                </div>
              </div>

              <AuthorList authors={authors} />
            </div>

            <Pagination
              className={'pagination is-centered authors-pagination'}
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
      )}
    </section>
  );
};
