import React, { useCallback, useEffect, useState } from 'react';
import './Catalog.scss';
import 'bulma/css/bulma.css';
import { Painting } from "../types/painting";
import { Gallery } from "./Gallery";
import { Pagination } from '../components/Pagination';
import { Loader } from '../components/Loader';
import { SortDropdown } from '../components/SortDropdown';
import { Filters } from '../components/Filters';
import axios from 'axios';

const SEARCH = 'https://www.albedosunrise.com/paintings/search?';

export const Catalog: React.FC = () => {
  const [perPage, setPerPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [countOfFiltered, setCountOfFiltered] = useState(0);
  const [sortBy, setSortBy] = useState('sortBy=entityCreatedAt:DESC');
  const [currentPaintings, setCurrentPaintings] = useState<Painting[]>([]);
  const [filters, setFilters] = useState('');

  const defaultPerPage = `page=${currentPage - 1}&pageSize=${perPage}`;

  const getFilteredPaintingsFromServer = useCallback(async (filters: string) => {
    setIsFetching(true);

    axios.get(SEARCH + filters + '&' + sortBy + '&' + defaultPerPage)
      .then((response) => {
        setCountOfFiltered(response.data.page.totalElements);
        setCurrentPaintings(response.data.paintings);
        setPageCount(response.data.page.totalPages);
        })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300)
      })
  }, [defaultPerPage, sortBy]);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+event.target.value);
  };

  useEffect(() => {
    getFilteredPaintingsFromServer(filters);
  }, [sortBy, defaultPerPage, getFilteredPaintingsFromServer, filters]);

  const notificationNoPaintings = (
    <div className="notification is-warning catalog-notification">
      There are no paintings on server!
    </div>
  );

  return (
    <section className="section catalog">
      <div className="catalog-header title is-3">
        {!isFetching && `Paintings: ${countOfFiltered}`}
      </div>

      <div className="catalog-info">
        <Filters setFilters={setFilters} />
        <div className="container paintinglist">
          {isFetching
            ? <Loader />
            : (
              <>
                <div className="painting-container">
                  <SortDropdown
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    perPage={perPage}
                    handlePerPageChange={handlePerPageChange}
                  />
                  {!currentPaintings.length
                    ? notificationNoPaintings
                    : <Gallery paintings={currentPaintings} />
                  }
                </div>

                <Pagination
                  className={'pagination is-centered'}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
        </div>
      </div>
    </section>
  );
};
