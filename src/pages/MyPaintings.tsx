import React, { useEffect, useState } from 'react';
import { PaintingList } from '../components/PaintingList';
import axios from 'axios';
import { Pagination } from '../components/Pagination';
import { Author } from '../types/painting';
import { CreatePainting } from '../components/CreatePainting';
import { Loader } from '../components/Loader';

const URL = 'https://www.albedosunrise.com/paintings/by-author?authorId='

type Props = {
  author: Author;
};

export const MyPaintings: React.FC<Props> = ({ author }) => {
  const [paintings, setPaintings] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [sortBy, setSortBy] = useState('');
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const sortByYearAsc = 'sortBy=yearOfCreation:ASC';
  const sortByYearDesc = 'sortBy=yearOfCreation:DESC';
  const sortByPriceAsc = 'sortBy=price:ASC';
  const sortByPriceDesc = 'sortBy=price:DESC';
  const defaultPerPage = `page=${currentPage - 1}&pageSize=${perPage}`;

  const notification = (
    <>
      <div className="notification is-light profile-notification">
        <span className="profile-notification-subtitle">There are no paintings added yet</span>
        <button
          className="button is-warning button-get-all"
          onClick={() => {
            setIsCreateVisible(!isCreateVisible);
          }}
        >
          Create Painting
        </button>
      </div>

      {isCreateVisible && (
        <div className="profile-no-paintings">
          <CreatePainting name={author.fullName} />
        </div>
      )}
    </>
  );

  const getPaintingsFromServer = async () => {
    await axios.get(URL + author.id + '&' + defaultPerPage)
    .then((response) => {
      setPaintings(response.data.paintings);
      setPageCount(response.data.page.totalPages);
      console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300);
      })
  };

  useEffect(() => {
    getPaintingsFromServer();
  }, [currentPage, perPage]);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+event.target.value);
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {!paintings.length
            ? notification
            : (
              <div className="container my-works">
                <div className="sorting">
                  <div className="sorting-container">
                    <div className="sorting-title">Sorting:</div>
                    <select
                      className="sortby dropdown"
                      onChange={(event) => setSortBy(event.target.value)}
                      value={sortBy}
                    >
                      <option value={sortByYearAsc}>Newest</option>
                      <option value={sortByYearDesc}>Oldest</option>
                      <option value={sortByPriceAsc}>Cheapest</option>
                      <option value={sortByPriceDesc}>Most expensive</option>
                    </select>
                  </div>
                  <div className="sorting-container">
                    <div className="sorting-title">Per page:</div>
                    <select
                      className="perpage dropdown"
                      onChange={handlePerPageChange}
                      value={perPage}
                    >
                      <option value={2}>2</option>
                      <option value={4}>4</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                </div>

                <PaintingList paintings={paintings}/>

                <Pagination
                  className={'pagination is-left'}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
        </>
      )}
    </>
  );
};