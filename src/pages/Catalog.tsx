import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './Catalog.scss';
import 'bulma/css/bulma.css';
import { Painting } from "../types/painting";
import { Gallery } from "./Gallery";
import { Range } from 'react-input-range';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

type Props = {
  sortBy: string;
  search: string;
  paintings: Painting[];
  getFiltered: (filters: string) => void;
  setSortBy: React.Dispatch<SetStateAction<string>>;
  setPaintings: React.Dispatch<SetStateAction<Painting[]>>;
};

export const Catalog: React.FC<Props> = ({
  sortBy,
  search,
  setSortBy,
  paintings,
  getFiltered,
  setPaintings,
}) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [price, setPrice] = useState<Range>({ max: 5000, min: 10 });
  const [stylesParams, setStylesParams] = useState<string[]>([]);
  const [mediumParams, setMediumParams] = useState<string[]>([]);
  const [supportParams, setSupportParams] = useState<string[]>([]);

  const sortByYearAsc = 'sortBy=yearOfCreation:ASC';
  const sortByYearDesc = 'sortBy=yearOfCreation:DESC';
  const sortByPriceAsc = 'sortBy=price:ASC';
  const sortByPriceDesc = 'sortBy=price:DESC';
  const priceBetween = `priceBetween=${price.min},${price.max}`;
  const widthBetween = `widthBetween=0,${width}`;
  const heightBetween = `heightBetween=0,${height}`;
  const styleIn = `styleIn=${stylesParams.join(',')}`;
  const supportIn = `supportIn=${supportParams.join(',')}`;
  const mediumIn = `mediumIn=${mediumParams.join(',')}`;

  const getFilterParams = (
    priceBetween: string,
    widthBetween: string,
    heightBetween: string,
    styleIn: string,
    mediumIn: string,
    supportIn: string,
  ) => {
    // const params = [
    //   priceBetween,
    //   widthBetween,
    //   heightBetween,
    //   styleIn,
    //   mediumIn,
    //   supportIn,
    // ];

    const params = [priceBetween];

    if (width !== 0) {
      params.push(widthBetween);
    }

    if (height !== 0) {
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
        setPrice({
          min: +event.target.value,
          max: price.max,
        });
    }
  };

  const changeMaxPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    ) => {
    if (isNumber.test(event.target.value)
      || event.target.value === '') {
        setPrice({
          max: +event.target.value,
          min: price.min
        });
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

  const getSortedPaintings = async (sortBy: string = '') => {
    console.log(search + sortBy);
    if (filterParams.length > 0 && sortBy.length > 0) {
      await axios.get(search + filterParams +'&' + sortBy)
        .then((response) => {
          setPaintings(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    if (!filterParams && sortBy.length > 0) {
      await axios.get(search + sortBy)
        .then((response) => {
          setPaintings(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    if (filterParams.length > 0 && sortBy === '') {
      await axios.get(search + filterParams)
        .then((response) => {
          setPaintings(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  useEffect(() => {
    getSortedPaintings(sortBy);
  }, [sortBy])

  const handleApplyFilters = () => {
    getFiltered(filterParams);
  };

  const handleClearFilters = () => {
    setHeight(0);
    setWidth(0);
    setPrice({max: 5000, min: 10});
    setStylesParams([]);
    setMediumParams([]);
    setSupportParams([]);
    setCheckedStyles(new Array(styles.length).fill(false));
    setCheckedMediums(new Array(styles.length).fill(false));
    setCheckedSupports(new Array(styles.length).fill(false));
    setSortBy('');
    getFiltered('');
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
        Paintings (number)
      </div>

      <div className="catalog-info">
        <div className="filters">
          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">Price</div>

            <div className="filter-inputs">
              <div className="filter-inputs">
                <div className="filter-subtitle">from:</div>
                <input
                  type="text"
                  className="filter-input subtitle filter-subtitle is-6"
                  value={`${price.min}`}
                  onChange={changeMinPrice}
                />
              </div>

              <div className="filter-inputs">
                <div className="filter-subtitle">to:</div>
                <input
                  type="text"
                  className="filter-input subtitle filter-subtitle is-6"
                  value={`${price.max}`}
                  onChange={changeMaxPrice}
                />
              </div>
            </div>

            <InputRange
              formatLabel={value => `€ ${value}`}
              minValue={10}
              maxValue={5000}
              value={price}
              onChange={(value) => {
                if (typeof value === 'object')
                setPrice(value);
              }}
            />
          </div>

          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">
              Height (cm)
            </div>

            <InputRange
                formatLabel={value => `${value} cm`}
                minValue={10}
                maxValue={500}
                value={height}
                onChange={(value) => {
                  if (typeof value === 'number') {
                    setHeight(value);
                  }
                }}
              />
          </div>

          <div className="filter filter-container">
            <div className="subtitle filter-subtitle is-6">
              Width (cm)
            </div>

            <InputRange
              formatLabel={value => `${value} cm`}
              minValue={10}
              maxValue={500}
              value={width}
              onChange={value => {
                if (typeof value === 'number') {
                  setWidth(value);
                }
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
          <div className="sorting">
            <div className="sorting-container">
              <div className="sorting-title">Sorting:</div>

              <select
                className="sortby dropdown"
                onChange={(event) => setSortBy(event.target.value)}
                value={sortBy}
              >
                <option value="">No sorting</option>
                <option value={sortByYearAsc}>Newest</option>
                <option value={sortByYearDesc}>Oldest</option>
                <option value={sortByPriceAsc}>Cheapest</option>
                <option value={sortByPriceDesc}>Most expensive</option>
              </select>
            </div>

            <div className="sorting-container">
              <div className="sorting-title">Per page:</div>

              <select className="perpage dropdown">
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="72">72</option>
              </select>
            </div>
          </div>

          <Gallery paintings={paintings} />
        </div>
      </div>
    </section>
  );
};
