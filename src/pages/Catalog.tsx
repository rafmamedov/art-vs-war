import { useCallback, useEffect, useState } from 'react';
import '../styles/Catalog.scss';
import 'bulma/css/bulma.css';
import { Painting } from "../types/painting";
import { Pagination } from '../components/Pagination';
import { Loader } from '../components/Loader';
import { SortDropdown } from '../components/SortDropdown';
import { Filters } from '../components/Filters';
import axios from 'axios';
import { PaintingList } from '../components/PaintingList';

const SEARCH = 'https://www.albedosunrise.com/paintings/search?';

export const Catalog = () => {
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
        console.log(response);
        setCountOfFiltered(response.data.page.totalElements);
        setCurrentPaintings(response.data.entities);
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
      There are no paintings in database!
    </div>
  );

  return (
    <section className="section catalog">
      <div className="catalog-header title is-3">
        {!isFetching && `Paintings: ${countOfFiltered}`}
      </div>

      <div className="catalog-info">
        <Filters setFilters={setFilters} setCurrentPage={setCurrentPage} />
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
                    : <PaintingList paintings={currentPaintings} />
                  }
                </div>

                {currentPaintings.length > 0 && (
                  <Pagination
                    className={'pagination is-centered'}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </>
            )}
        </div>
      </div>
    </section>
  );
};
