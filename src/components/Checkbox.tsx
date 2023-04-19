import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { Style } from '../types/painting';

const GETSTYLES = 'https://www.albedosunrise.com/';

type Props = {
  checkboxItem: string;
};

export const Checkbox: React.FC<Props> = ({ checkboxItem }) => {
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [items, setItems] = useState([]);
  const selectRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (!selectRef?.current?.contains(event.target)) {
      setIsCheckboxActive(false);
    }
  }

  const getAllItems = async () => {
    await axios.get(GETSTYLES + checkboxItem)
      .then((response) => {
        const result = response.data._embedded[checkboxItem]
          .map((item: Style) => item.name);
        setItems(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectRef]);

  return (
    <div className="field painting-item">
      <label className="label">Art movement</label>
      <div
        ref={selectRef}
        className="control">
        <div
          onClick={() => setIsCheckboxActive(!isCheckboxActive)}
          className={classNames('dropdown', {
          'is-active': isCheckboxActive,
          })}
        >
          <div className="dropdown-trigger">
            <button className="button painting-item" aria-haspopup="true" aria-controls="dropdown-menu2">
              <span>choose {checkboxItem}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>

          <div
            className="dropdown-menu painting-item"
            id="dropdown-menu2"
            role="menu"
          >
            <div className="dropdown-content">
              {items.length > 0 && (
                items.map(item => (
                  <label key={item} className="radio">
                    <input type="radio" name={checkboxItem} />
                    {item}
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};