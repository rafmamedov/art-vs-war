import { SetStateAction, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { Style } from '../types/painting';

const GETSTYLES = 'https://www.albedosunrise.com/';

type Props = {
  checkboxItem: string;
  getErrors: (field: string) => JSX.Element | undefined;
  onSelect: React.Dispatch<SetStateAction<number>>;
};

export const Checkbox: React.FC<Props> = ({
  checkboxItem,
  onSelect,
  getErrors,
}) => {
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [items, setItems] = useState([]);
  const selectRef = useRef<any>(null);
  const checkboxName = checkboxItem.slice(0, checkboxItem.length - 1) + 'Id';

  const handleClickOutside = (event: any) => {
    if (!selectRef?.current?.contains(event.target)) {
      setIsCheckboxActive(false);
    }
  };

  const toUpperCasedTitle = (title: string) => (
    title.slice(0, 1).toUpperCase() + title.slice(1)
  );

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
  };

  const handleSelectItem = (value: string, id: number) => {
    onSelect(id + 1);
    setSelectedItem(value);
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
      <label className="label required-field">{toUpperCasedTitle(checkboxItem)}</label>
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
              <span>
                {selectedItem.length
                  ? selectedItem
                  : `choose ${checkboxItem}`}
              </span>
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
                items.map((item, index) => (
                  <label key={item} className="radio">
                    <input
                      type="radio"
                      value={item}
                      name={checkboxItem}
                      onChange={() => handleSelectItem(item, index)}
                    />
                    {item}
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {getErrors(checkboxName)}
    </div>
  );
};