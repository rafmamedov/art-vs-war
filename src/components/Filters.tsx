import React, { SetStateAction, useEffect, useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../pages/Catalog.scss';
import axios from "axios";

const MAXPRICE = 'https://www.albedosunrise.com/paintings/maxPrice';
const MINPRICE = 'https://www.albedosunrise.com/paintings/minPrice';
const MAXHEIGHT = 'https://www.albedosunrise.com/paintings/maxHeight';
const MAXWIDTH = 'https://www.albedosunrise.com/paintings/maxWidth';

const isNumber = /^\d+$/;

const styles = [
  'abstraction',
  'cubism',
  'expressionism',
  'impressionism',
  'photorealism',
  'minimalism',
  'modern',
  'pop art',
  'primitivism/naive art',
  'realism',
  'surrealism',
];

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

type Props = {
  setFilters: React.Dispatch<SetStateAction<string>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
};

export const Filters: React.FC<Props> = ({ setFilters, setCurrentPage }) => {
  const [price, setPrice] = useState<number[]>([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [width, setWidth] = useState([0, 300]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [height, setHeight] = useState([0, 300]);
  const [stylesParams, setStylesParams] = useState<string[]>([]);
  const [mediumParams, setMediumParams] = useState<string[]>([]);
  const [supportParams, setSupportParams] = useState<string[]>([]);
  const [isStylesVisible, setIsStylesVisible] = useState(false);
  const [isMediumsVisible, setIsMediumsVisible] = useState(false);
  const [isSupportsVisible, setIsSupportsVisible] = useState(false);

  const [checkedStyles, setCheckedStyles] = useState(
    new Array(styles.length).fill(false)
  );

  const [checkedMediums, setCheckedMediums] = useState(
    new Array(mediums.length).fill(false)
  );

  const [checkedSupports, setCheckedSupports] = useState(
    new Array(mediums.length).fill(false)
  );

  const getMaxPrice = async () => {
    await axios.get(MAXPRICE)
      .then(response => {
        setMaxPrice(response.data);
      });
  };

  const getMaxHeight = async () => {
    await axios.get(MAXHEIGHT)
      .then(response => {
        setMaxHeight(response.data);
      });
  };

  const getMaxWidth = async () => {
    await axios.get(MAXWIDTH)
      .then(response => {
        setMaxWidth(response.data);
      });
  };

  const getMinPrice = async () => {
    await axios.get(MINPRICE)
      .then(response => {
        setMinPrice(response.data);
      });
  };

  useEffect(() => {
    getMinPrice();
    getMaxPrice();
    getMaxWidth();
    getMaxHeight();
    setWidth([0, maxWidth]);
    setHeight([0, maxHeight]);
    setPrice([minPrice, maxPrice]);
  }, [minPrice, maxPrice, maxHeight, maxWidth]);

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

  const handleApplyFilters = () => {
    const priceBetween = `priceBetween=${price[0]},${price[1]}`;
    const widthBetween = `widthBetween=${width[0]},${width[1]}`;
    const heightBetween = `heightBetween=${height[0]},${height[1]}`;
    const styleIn = `styleIn=${stylesParams.join(',')}`;
    const supportIn = `supportIn=${supportParams.join(',')}`;
    const mediumIn = `mediumIn=${mediumParams.join(',')}`;

    const filterParams = getFilterParams(
      priceBetween,
      widthBetween,
      heightBetween,
      styleIn,
      mediumIn,
      supportIn,
    );

    setFilters(filterParams);
    setCurrentPage(1);
  };

  const handleClearFilters = async () => {
    setFilters('');
    setPrice([minPrice, maxPrice]);
    setWidth([0, maxWidth]);
    setHeight([0, maxHeight]);
    setStylesParams([]);
    setMediumParams([]);
    setSupportParams([]);
    setIsStylesVisible(false);
    setIsMediumsVisible(false);
    setIsSupportsVisible(false);
    setCheckedStyles(new Array(styles.length).fill(false));
    setCheckedMediums(new Array(styles.length).fill(false));
    setCheckedSupports(new Array(styles.length).fill(false));
  };

  const changeMinPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    ) => {
    if (isNumber.test(event.target.value) || event.target.value === '') {
        setPrice([+event.target.value, price[1]]);
    }
  };

  const changeMaxPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    ) => {
    if (isNumber.test(event.target.value) || event.target.value === '') {
        setPrice([price[0], +event.target.value]);
    }
  };

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
                value={price[0]}
                onChange={changeMinPrice}
              />
            </div>

            <div className="filter-inputs">
              <div className="filter-subtitle">to:</div>
              <input
                type="text"
                className="filter-input subtitle filter-subtitle is-6"
                value={price[1]}
                onChange={changeMaxPrice}
              />
            </div>
          </div>

          <RangeSlider
            min={0}
            max={maxPrice}
            defaultValue={price}
            value={price}
            onInput={(value: number[]) => {
              setPrice(value)
            }}
          />
      </div>

      <div className="filter filter-container">
        <div className="subtitle filter-subtitle is-6">
          {`Height: ${height[0]} - ${height[1]} cm`}
        </div>

        <RangeSlider
            min={0}
            max={maxHeight}
            defaultValue={height}
            value={height}
            onInput={(value: number[]) => {
              setHeight(value);
            }}
          />
      </div>

      <div className="filter filter-container">
        <div className="subtitle filter-subtitle is-6">
          {`Width: ${width[0]} - ${width[1]} cm`}
        </div>

        <RangeSlider
          min={0}
          max={maxWidth}
          defaultValue={width}
          value={width}
          onInput={(value: number[]) => {
            setWidth(value);
          }}
        />
      </div>

      <div className="filter filter-container">
        <div
          className="subtitle filter-subtitle is-6 select filter-select"
          onClick={() => setIsStylesVisible(!isStylesVisible)}
        >
          Styles
        </div>

        {isStylesVisible && (
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
        )}
      </div>

      <div className="filter filter-container">
        <div
          className="subtitle filter-subtitle is-6 select filter-select"
          onClick={() => setIsMediumsVisible(!isMediumsVisible)}
        >
          Medium
        </div>

        {isMediumsVisible && (
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
        )}
      </div>

      <div className="filter filter-container">
        <div
          className="subtitle filter-subtitle is-6 select filter-select"
          onClick={() => setIsSupportsVisible(!isSupportsVisible)}
        >
          Support
        </div>

        {isSupportsVisible && (
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
        )}
      </div>

      <button
        className="button-get-all button-get-all-dark filter-button"
        onClick={handleApplyFilters}
      >
        Apply
      </button>

      <button
        className="button-get-all filter-button"
        onClick={handleClearFilters}
      >
        Clear filters
      </button>
    </div>
  );
};
