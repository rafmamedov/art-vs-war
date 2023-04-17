import React, { useEffect, useState } from 'react';
import { PaintingList } from '../components/PaintingList';
import axios from 'axios';
import { Pagination } from '../components/Pagination';

const SEARCH = 'https://www.albedosunrise.com/paintings/search?';

export const MyPaintings = () => {
  const [paintings, setPaintings] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [sortBy, setSortBy] = useState('');

  const sortByYearAsc = 'sortBy=yearOfCreation:ASC';
  const sortByYearDesc = 'sortBy=yearOfCreation:DESC';
  const sortByPriceAsc = 'sortBy=price:ASC';
  const sortByPriceDesc = 'sortBy=price:DESC';

  const defaultPerPage = `page=${currentPage - 1}&pageSize=${perPage}`;

  
  const getPaintingsFromServer = async () => {
    await axios.get(SEARCH + '&' + defaultPerPage)
    .then((response) => {
      setPaintings(response.data.paintings);
      setPageCount(response.data.page.totalPages);
      console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
    <div className="container my-works">
      {/* <div className="author-title">My paintings</div> */}
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
  );
};