import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './Catalog.scss';
import 'bulma/css/bulma.css';
import { Painting } from "../types/painting";
import { Gallery } from "./Gallery";
import axios from 'axios';
import { Pagination } from '../components/Pagination';
import { Loader } from '../components/Loader';

const SEARCH = 'https://www.albedosunrise.com/paintings/search?';
const COUNT = 'https://www.albedosunrise.com/paintings/count';

export const Catalog: React.FC = () => {
  const [sortBy, setSortBy] = useState('sortBy=entityCreatedAt:DESC');
  const [perPage, setPerPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const [width, setWidth] = useState([0, 300]);
  const [height, setHeight] = useState([0, 300]);
  const [price, setPrice] = useState([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countOfFiltered, setCountOfFiltered] = useState(0);
  const [stylesParams, setStylesParams] = useState<string[]>([]);
  const [mediumParams, setMediumParams] = useState<string[]>([]);
  const [supportParams, setSupportParams] = useState<string[]>([]);
  const [currentPaintings, setCurrentPaintings] = useState<Painting[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const sortByDateAsc = 'sortBy=entityCreatedAt:ASC';
  const sortByDateDesc = 'sortBy=entityCreatedAt:DESC';
  const sortByPriceAsc = 'sortBy=price:ASC;entityCreatedAt:DESC';
  const sortByPriceDesc = 'sortBy=price:DESC;entityCreatedAt:DESC';
  const priceBetween = `priceBetween=${price[0]},${price[1]}`;
  const widthBetween = `widthBetween=${width[0]},${width[1]}`;
  const heightBetween = `heightBetween=${height[0]},${height[1]}`;
  const styleIn = `styleIn=${stylesParams.join(',')}`;
  const supportIn = `supportIn=${supportParams.join(',')}`;
  const mediumIn = `mediumIn=${mediumParams.join(',')}`;
  const defaultPerPage = `page=${currentPage - 1}&pageSize=${perPage}`;
  

  const getFilteredPaintingsFromServer = async (filters: string) => {
    console.log(filterParams);
    console.log(SEARCH + filters + '&' + sortBy + '&' + defaultPerPage);
    await axios.get(SEARCH + filters + '&' + sortBy + '&' + defaultPerPage)
    .then((response) => {
      console.log(response);
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
  };

  // const getTotalCountOfPaintings = async () => {
  //   await axios.get(COUNT)
  //   .then((response) => {
  //     totalPaintingsInBase = response.data;
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

  // useEffect(() => {
  //   getTotalCountOfPaintings();
  // }, []);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+event.target.value);
  };

  const getFilterParams = (
    priceBetween: string,
    widthBetween: string,
    heightBetween: string,
    styleIn: string,
    mediumIn: string,
    supportIn: string,
  ) => {
    const params = [priceBetween, widthBetween, heightBetween];

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
    setCurrentPage(1);
    getFilteredPaintingsFromServer(filterParams);
  };

  useEffect(() => {
    getFilteredPaintingsFromServer(filterParams);
  }, [sortBy, currentPage, perPage]);

  const handleClearFilters = () => {
    setPerPage(6);
    setWidth([0, 150]);
    setHeight([0, 150]);
    setPrice([0, 1500]);
    setStylesParams([]);
    setMediumParams([]);
    setSupportParams([]);
    setSortBy(sortByDateDesc);
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
        {!isFetching && `Paintings: ${countOfFiltered}`}
      </div>

      {isFetching
        ? <Loader />
        : (
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
                  {`Height: ${height[0]} - ${height[1]}+ cm`}
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
                  {`Width: ${width[0]} - ${width[1]}+ cm`}
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
                  Styles
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
                  <div className="sorting-container">
                    <div className="sorting-title">Sorting:</div>
                    <select
                      className="sortby dropdown"
                      onChange={(event) => setSortBy(event.target.value)}
                      value={sortBy}
                    >
                      <option value={sortByDateDesc}>Newest</option>
                      <option value={sortByDateAsc}>Oldest</option>
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
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                    </select>
                  </div>
                </div>
                <Gallery paintings={currentPaintings} />
              </div>

              <Pagination
                className={'pagination is-centered'}
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}
    </section>
  );
};
