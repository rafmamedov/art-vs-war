import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import 'bulma/css/bulma.css';
import '../pages/Profile.scss'
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Checkbox } from './Checkbox';

const URL = 'https://www.albedosunrise.com/paintings';
const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=';
const element = <FontAwesomeIcon className="far" icon={faArrowRight} />;
const uploadIcon = <FontAwesomeIcon className="far" icon={faUpload} />;

type Props = {
  name: string,
};

export const CreatePainting: React.FC<Props> = ({ name }) => {
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [description, setDescription] = useState('');
  const [isStylesActive, setIsStylesActive] = useState(false);
  const [isMediumActive, setIsMediumActive] = useState(false);
  const [isSupportActive, setIsSupportActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const selectRef = useRef<any>(null);

  const {
    user,
  } = useAuthenticator((context) => [context.user]);

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
          const imageDataPost = {
            title,
            price,
            authorId: user.username,
            description,
            yearOfCreation: year,
            height,
            width,
            styleId: 1,
            mediumId: 1,
            supportId: 1,
            imageFileName: imageFileName,
          };

          Auth.currentSession()
            .then(response => {
              const accessToken = response.getAccessToken().getJwtToken();
              const headers = {
                'Authorization': `Bearer ${accessToken}`,
              }

              axios.post(URL, imageDataPost, { headers })
                .then(response => console.log('post other fields', response))
                .catch(error => console.log('error', error));
            });
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
    setHeight('');
    setWidth('');
    setPrice('');
    setSelectedImage(null);
  }

  const notificationSuccess = (
    <div className="notification is-success profile-item-about">
      <button
        className="delete"
        onClick={() => setIsAdded(false)}
      />
      Painting is successfuly added!
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
                    placeholder="painting title"
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

              <div className="field profile-item">
                <label className="label">Price</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="price €"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div className="field profile-item">
                <label className="label">Width</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="width cm"
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>

              <div className="field profile-item">
                <label className="label">Height</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="height cm"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-info">
              <Checkbox checkboxItem='styles' />
              <Checkbox checkboxItem='mediums' />
              <Checkbox checkboxItem='supports' />
            </div>

            <div className="field profile-item-about">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea profile-item"
                  placeholder="write a short description about painting"
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