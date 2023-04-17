import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import 'bulma/css/bulma.css';
import '../pages/Profile.scss'
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const element = <FontAwesomeIcon className="far" icon={faArrowRight} />;
const uploadIcon = <FontAwesomeIcon className="far" icon={faUpload} />;

type Props = {
  title: string;
  price: number;
  width: number;
  height: number;
  name: string,
  year: string;
  description: string;
  setPrice: React.Dispatch<SetStateAction<number>>;
  setHeight: React.Dispatch<SetStateAction<number>>;
  setWidth: React.Dispatch<SetStateAction<number>>;
  setTitle: React.Dispatch<SetStateAction<string>>;
  setYear: React.Dispatch<SetStateAction<string>>;
  setDescription: React.Dispatch<SetStateAction<string>>;
};
const URL = 'https://www.albedosunrise.com/paintings';
const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=';

export const CreatePainting: React.FC<Props> = ({
  name,
  year,
  title,
  price,
  width,
  height,
  setYear,
  setTitle,
  setPrice,
  setWidth,
  setHeight,
  description,
  setDescription,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isStylesActive, setIsStylesActive] = useState(false);
  const [isMediumActive, setIsMediumActive] = useState(false);
  const [isSupportActive, setIsSupportActive] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const selectRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (!selectRef?.current?.contains(event.target)) {
      setIsStylesActive(false);
    }
  }
  
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectRef]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  }

  const onFileUpload = async () => {
    console.log('onFileUpload');
    axios.get(UPLOAD + selectedImage?.type.split('/')[1])
    .then((response) => {
      const {
        imagePutUrl,
        imageFileName,
      } = response.data;

      selectedImage && axios.put(imagePutUrl, selectedImage)
        .then(response => {
          console.log('save image request', response);

          const imageDataPost = {
            title,
            price,
            authorId: 1,
            description,
            yearOfCreation: year,
            createdAt: new Date(),
            height,
            width,
            styleId: 1,
            mediumId: 1,
            supportId: 1,
            imageFileName: imageFileName,
          };

          axios.post(URL, imageDataPost)
            .then(response => console.log('post other fields', response))
            .catch(error => console.log('error', error));
        })
        .catch((error) => {
          console.log(error);
        })

      setIsAdded(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleCancelEditing = () => {
    setTitle('');
    setDescription('');
    setYear('');
    setHeight(0);
    setWidth(0);
    setPrice(0);
    setSelectedImage(null);
  }

  const notificationSuccess = (
    <div className="notification is-success profile-item-about">
      <button
        className="delete"
        onClick={() => setIsAdded(false)}
      />
      Painting is successfuly created!
    </div>
  );

  useEffect(() => {
    setTimeout(() => (
      setIsAdded(false)
    ), 3000);
  }, [isAdded]);

  return (
    <div className="profile-container">
      {isAdded
        ? (
          notificationSuccess
        ) : (
          <>
            <div className="profile-info">
              <div className="field profile-item">
                <label className="label">Title</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="full name"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>

              <div className="field profile-item">
                <label className="label">Add painting image</label>

                <div className="file has-name is-right is-fullwidth">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="painting image file"
                      onChange={onFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        {uploadIcon}
                      </span>
                      <span className="file-label">
                        Choose a file
                      </span>
                    </span>
                    <span className="file-name">
                      {selectedImage?.name}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div className="field profile-item">
                <label className="label">Author</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="author's name"
                    value={name}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>

              <div className="field profile-item">
                <label className="label">Year</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="year of creation"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-info painting-grouped">
              <div className="field painting-item">
                <label className="label">Width</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="width cm"
                    value={width}
                    onChange={(event) => setWidth(+event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>

              <div className="field painting-item">
                <label className="label">Height</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="height cm"
                    value={height}
                    onChange={(event) => setHeight(+event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>

              <div className="field painting-item">
                <label className="label">Price</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="price €"
                    value={price}
                    onChange={(event) => setPrice(+event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div className="field painting-item">
                <label className="label">Art movement</label>
                <div
                  ref={selectRef}
                  className="control">
                  <div
                    onClick={() => setIsStylesActive(!isStylesActive)}
                    className={classNames('dropdown', {
                    'is-active': isStylesActive,
                    })}
                  >
                    <div className="dropdown-trigger">
                      <button className="button painting-item" aria-haspopup="true" aria-controls="dropdown-menu2">
                        <span>choose styles</span>
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
                      <label className="checkbox">
                        <input type="checkbox"/>
                        abstraction
                      </label>
                        <hr className="dropdown-divider"/>
                        <label className="checkbox">
                          <input type="checkbox"/>
                          cubism
                        </label>
                        <hr className="dropdown-divider"/>
                        <label className="checkbox">
                          <input type="checkbox"/>
                          expressionism
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="field painting-item"
                onClick={() => setIsMediumActive(!isMediumActive)}
              >
                <label className="label">Medium</label>
                <div className="control">
                  <div
                    className={classNames('dropdown', {
                    'is-active': isMediumActive,
                    })}
                  >
                    <div className="dropdown-trigger">
                      <button className="button painting-item" aria-haspopup="true" aria-controls="dropdown-menu2">
                        <span>choose medium</span>
                        <span className="icon is-small">
                          <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </button>
                    </div>

                    <div className="dropdown-menu painting-item" id="dropdown-menu2" role="menu">
                      <div className="dropdown-content">
                      <label className="checkbox">
                        <input type="checkbox"/>
                        oil
                      </label>
                        <hr className="dropdown-divider"/>
                        <label className="checkbox">
                          <input type="checkbox"/>
                          acrylic
                        </label>
                        <hr className="dropdown-divider"/>
                        <label className="checkbox">
                          <input type="checkbox"/>
                          watercolor
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field painting-item">
                <label className="label">Support</label>
                <div
                  ref={selectRef}
                  className="control">
                  <div
                    onClick={() => setIsSupportActive(!isSupportActive)}
                    className={classNames('dropdown', {
                    'is-active': isSupportActive,
                    })}
                  >
                    <div className="dropdown-trigger">
                      <button className="button painting-item" aria-haspopup="true" aria-controls="dropdown-menu2">
                        <span>choose support</span>
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
                      <label className="checkbox">
                        <input type="checkbox"/>
                        canvas
                      </label>
                        <hr className="dropdown-divider"/>
                        <label className="checkbox">
                          <input type="checkbox"/>
                          hardboard
                        </label>
                        <hr className="dropdown-divider"/>
                        <label className="checkbox">
                          <input type="checkbox"/>
                          paper
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field profile-item-about">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea profile-item"
                  placeholder="write a short story about you"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button button-submit is-dark"
                  onClick={onFileUpload}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  className="button button-submit is-light"
                  onClick={handleCancelEditing}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
};