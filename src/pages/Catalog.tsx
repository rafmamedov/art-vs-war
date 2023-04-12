import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './Catalog.scss';
import 'bulma/css/bulma.css';
import { Painting } from "../types/painting";
import { Gallery } from "./Gallery";
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';

const SEARCH = 'https://www.albedosunrise.com/paintings/search?';

export const Catalog: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [perPage, setPerPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [width, setWidth] = useState([0, 150]);
  const [height, setHeight] = useState([0, 150]);
  const [price, setPrice] = useState([0, 1500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPaintings, setTotalPaintings] = useState(0);
  const [stylesParams, setStylesParams] = useState<string[]>([]);
  const [mediumParams, setMediumParams] = useState<string[]>([]);
  const [supportParams, setSupportParams] = useState<string[]>([]);
  const [currentPaintings, setCurrentPaintings] = useState<Painting[]>([]);

  const sortByYearAsc = 'sortBy=yearOfCreation:ASC';
  const sortByYearDesc = 'sortBy=yearOfCreation:DESC';
  const sortByPriceAsc = 'sortBy=price:ASC';
  const sortByPriceDesc = 'sortBy=price:DESC';
  const priceBetween = `priceBetween=${price[0]},${price[1]}`;
  const widthBetween = `widthBetween=${width[0]},${width[1]}`;
  const heightBetween = `heightBetween=${height[0]},${height[1]}`;
  const styleIn = `styleIn=${stylesParams.join(',')}`;
  const supportIn = `supportIn=${supportParams.join(',')}`;
  const mediumIn = `mediumIn=${mediumParams.join(',')}`;
  const defaultPerPage = `page=${currentPage - 1}&pageSize=${perPage}`;

  const getFilteredPaintingsFromServer = async (filters: string) => {
    await axios.get(SEARCH + filters + '&' + sortBy + '&' + defaultPerPage)
    .then((response) => {
      setCurrentPaintings(response.data.paintings);
      setTotalPaintings(response.data.page.totalElements);
      setPageCount(response.data.page.totalPages);
      console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const getArrayFromNumber = (num: number) => {
    const result = [];

    for (let i = 1; i <= pageCount; i++ ) {
      result.push(i);
    }

    return result;
  }

  const getFilterParams = (
    priceBetween: string,
    widthBetween: string,
    heightBetween: string,
    styleIn: string,
    mediumIn: string,
    supportIn: string,
  ) => {
    const params = [priceBetween];

    if (width[1] !== 500) {
      params.push(widthBetween);
    }

    if (height[1] !== 500) {
      params.push(heightBetween);
    }

    if (stylesParams.length > 0) {
      params.push(styleIn);
    }

    if (mediumParams.length > 0) {
      params.push(mediumIn);
    }

    if (supportParams.length > 0) {
      params.push(supportIn);
    }

    return params.filter(item => (item.length > 0 || +item !== 0)).join('&');
  }

  const isNumber = /^\d+$/;

  const changeMinPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    ) => {
    if (isNumber.test(event.target.value)) {
        setPrice([
          +event.target.value,
          price[1],
        ]);
    }
  };

  const changeMaxPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    ) => {
    if (isNumber.test(event.target.value)) {
        setPrice([
          price[0],
          +event.target.value,
        ]);
    }
  };

  const filterParams = getFilterParams(
    priceBetween,
    widthBetween,
    heightBetween,
    styleIn,
    mediumIn,
    supportIn,
  );

  const handleApplyFilters = () => {
    getFilteredPaintingsFromServer(filterParams);
  };

  useEffect(() => {
    getFilteredPaintingsFromServer(filterParams);
  }, [sortBy, currentPage, perPage]);

  const handleClearFilters = () => {
    setPerPage(2);
    setWidth([0, 150]);
    setHeight([0, 150]);
    setPrice([0, 1500]);
    setStylesParams([]);
    setMediumParams([]);
    setSupportParams([]);
    setSortBy(sortByYearAsc);
    setCheckedStyles(new Array(styles.length).fill(false));
    setCheckedMediums(new Array(styles.length).fill(false));
    setCheckedSupports(new Array(styles.length).fill(false));
  }

  const styles = [
    'abstraction',
    'cubism',
    'expressionism',
    'impressionism',
    'photorealism',
    'minimalism',
    'modern',
    'pop art',
    'primitivism/native art',
    'realism',
    'surrealism',
  ];

  const [checkedStyles, setCheckedStyles] = useState(
    new Array(styles.length).fill(false)
  );

  const handleCheckStyles = (position: number) => {
    const updatedCheckedState = checkedStyles.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedStyles(updatedCheckedState);

    const updatedSearchParams: string[] = [];

    updatedCheckedState.forEach((item, index) => {
      if (item) {
        updatedSearchParams.push(styles[index]);
      }
    })

    setStylesParams(updatedSearchParams);
  };

  const mediums = [
    'oil',
    'acrylic',
    'watercolor',
    'gouache',
    'collage',
    'pencil',
    'levkas',
    'pastel',
    'mixed media',
    'lonocut',
    'monotype',
    'enamel',
  ]

  const [checkedMediums, setCheckedMediums] = useState(
    new Array(mediums.length).fill(false)
  );

  const handleCheckMediums = (position: number) => {
    const updatedCheckedState = checkedMediums.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedMediums(updatedCheckedState);

    const updatedSearchParams: string[] = [];

    updatedCheckedState.forEach((item, index) => {
      if (item) {
        updatedSearchParams.push(mediums[index]);
      }
    })

    setMediumParams(updatedSearchParams);
  };
  
  const supports = [
    'canvas',
    'paper',
    'hardboard',
    'cardboard',
    'silk',
    'glass',
    'wooden board',
    'plywood',
  ]

  const [checkedSupports, setCheckedSupports] = useState(
    new Array(mediums.length).fill(false)
  );

  const handleCheckSupports = (position: number) => {
    const updatedCheckedState = checkedSupports.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedSupports(updatedCheckedState);

    const updatedSearchParams: string[] = [];

    updatedCheckedState.forEach((item, index) => {
      if (item) {
        updatedSearchParams.push(supports[index]);
      }
    })

    setSupportParams(updatedSearchParams);
  };

  const normalizeString = (string: string) => {
    if (string.includes(' ')) {
      const splited = string.split(' ');
      const result = splited[0]
        + splited[1].slice(0, 1).toUpperCase()
        + splited[1].slice(1);

      return result;
    }

    return string;
  };

  return (
    <section className="section catalog">
      <div className="catalog-header title is-3">
        {`Paintings: ${currentPaintings.length} from ${totalPaintings}`}
      </div>

      <div className="catalog-info">
        <div className="filters">
          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">Price</div>

            <div className="filter-inputs">
              <div className="filter-inputs">
                <label htmlFor="minPrice" className="filter-subtitle">from:</label>
                <input
                  id="minPrice"
                  type="text"
                  className="filter-input subtitle filter-subtitle is-6"
                  value={`${price[0]}`}
                  onChange={changeMinPrice}
                />
              </div>

              <div className="filter-inputs">
                <div className="filter-subtitle">to:</div>
                <input
                  type="text"
                  className="filter-input subtitle filter-subtitle is-6"
                  value={`${price[1]}`}
                  onChange={changeMaxPrice}
                />
              </div>
            </div>

            <RangeSlider
              min={0}
              max={1500}
              defaultValue={price}
              value={price}
              onInput={(value: number[]) => {
                setPrice(value)
              }}
            />
          </div>

          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">
              {`Width: ${width[0]} - ${width[1]} cm`}
            </div>

            <RangeSlider
              min={0}
              max={150}
              defaultValue={width}
              value={width}
              onInput={(value: number[]) => {
                setWidth(value);
              }}
            />
          </div>

          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">
              {`Height: ${height[0]} - ${height[1]} cm`}
            </div>

            <RangeSlider
                min={0}
                max={150}
                defaultValue={height}
                value={height}
                onInput={(value: number[]) => {
                  setHeight(value);
                }}
              />
          </div>

          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">
              Art movement, style
            </div>

            <div className="filter-checkbox">
              {styles.map((style, index) => (
                <div key={index} className="checkbox">
                  <input
                    id={style}
                    value={normalizeString(style)}
                    type="checkbox"
                    className="checkbox-content"
                    checked={checkedStyles[index]}
                    onChange={() => handleCheckStyles(index)}
                  />

                  <label htmlFor={style} className="checkbox-content">
                    {style}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">
              Medium
            </div>

            <div className="filter-checkbox">
              {mediums.map((medium, index) => (
                <div key={medium} className="checkbox">
                  <input
                    id={medium}
                    value={normalizeString(medium)}
                    type="checkbox"
                    className="checkbox-content"
                    checked={checkedMediums[index]}
                    onChange={() => handleCheckMediums(index)}
                  />
                  <label htmlFor={medium} className="checkbox-content">{medium}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">
              Support
            </div>

            <div className="filter-checkbox">
              {supports.map((support, index) => (
                <div key={support} className="checkbox">
                  <input
                    id={support}
                    value={normalizeString(support)}
                    type="checkbox"
                    className="checkbox-content"
                    checked={checkedSupports[index]}
                    onChange={() => handleCheckSupports(index)}
                  />
                  <label htmlFor={support} className="checkbox-content">{support}</label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="button-get-all button-get-all-dark"
            onClick={handleApplyFilters}
          >
            Apply
          </button>

          <button
            className="button-get-all"
            onClick={handleClearFilters}
          >
            Clear filters
          </button>
        </div>

        <div className="container paintinglist">
          <div className="painting-container">
            <div className="sorting">
              <nav
                className="pagination is-centered is-small"
                aria-label="pagination"
                role="navigation"
              >
                <button
                  className="pagination-previous"
                  onClick={() => setCurrentPage(
                    (prevPage) => prevPage === 0 ? prevPage : prevPage - 1
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
                      <Link
                        to={`/gallery/${page}`}
                        onClick={() => setCurrentPage(page)}
                        aria-label="Goto page 1"
                        className={classNames('pagination-link', {
                          'is-current': currentPage === page,
                        })}
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="sorting-container">
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
                    onChange={(event) => setPerPage(+event.target.value)}
                    value={perPage}
                  >
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>
            </div>

            <Gallery paintings={currentPaintings} />
          </div>

          <nav className="pagination pagination-lower is-centered">
            <button
              className="pagination-previous"
              onClick={() => setCurrentPage(
                (prevPage) => prevPage === 0 ? prevPage : prevPage - 1
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
                  <Link
                    to={`/gallery/${page}`}
                    onClick={() => setCurrentPage(page)}
                    aria-label="Goto page 1"
                    className={classNames('pagination-link', {
                      'is-current': currentPage === page,
                    })}
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};
