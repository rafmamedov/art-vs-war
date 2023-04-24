import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '../pages/Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Checkbox } from './Checkbox';
import classNames from 'classnames';
import { InputDescriptionError, InputHeightError, InputPriceError, InputTitleError, InputWidthError, InputYearError } from '../types/errors';

const URL = 'https://www.albedosunrise.com/paintings';
const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=';
const element = <FontAwesomeIcon className="far" icon={faArrowRight} />;
const uploadIcon = <FontAwesomeIcon className="far" icon={faUpload} />;

const isNumber = /^\d+$/;

export const CreatePainting: React.FC = () => {
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [styleId, setStyleId] = useState(0);
  const [errors, setErrors] = useState(['']);
  const [mediumId, setMediumId] = useState(0);
  const [supportId, setSupportId] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { user, route } = useAuthenticator((context) => [context.route]);
  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const isAuthenticated = route === 'authenticated';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors(['']);

    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleTextInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>
  ) => {
    setErrors(['']);

    if (!isNumber.test(event.target.value)) {
      setState(event.target.value);
    }
  }

  const handleNumberInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>
  ) => {
    setErrors(['']);

    if (isNumber.test(event.target.value)) {
      setState(event.target.value);
    }
  }

  const onSubmit = () => {
    setErrors(['']);

    if (!title.length) {
      setErrors((prevErrors) => [...prevErrors, InputTitleError.REQUIRED]);
    };

    if (!year.length) {
      setErrors((prevErrors) => [...prevErrors, InputYearError.REQUIRED]);
    };

    if (!price.length) {
      setErrors((prevErrors) => [...prevErrors, InputPriceError.REQUIRED]);
    };

    if (!height.length) {
      setErrors((prevErrors) => [...prevErrors, InputHeightError.REQUIRED]);
    };

    if (!width.length) {
      setErrors((prevErrors) => [...prevErrors, InputWidthError.REQUIRED]);
    };

    if (!description.length) {
      setErrors((prevErrors) => [...prevErrors, InputDescriptionError.REQUIRED]);
    };
  };

  const onFileUpload = async () => {
    if (isAuthenticated) {
      return;
    };

    onSubmit();

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
            styleId,
            mediumId,
            supportId,
            imageFileName: imageFileName,
          };

          axios.post(URL, imageDataPost, { headers })
            .then(() => setIsAdded(true))
            .catch(error => {
              setIsAdded(false);
              setErrors(error.response.data.errors.map((error: Error) => error.message));
            })
            .finally(() => {
              handleCancelEditing();
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleCancelEditing = () => {
    setTitle('');
    setDescription('');
    setYear('');
    setHeight('');
    setWidth('');
    setPrice('');
    setSelectedImage(null);
    setErrors(['']);
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
                    className={classNames('input', {
                      'is-danger': errors.includes(InputTitleError.TITLE)
                      || errors.includes(InputTitleError.LENGTH)
                      || errors.includes(InputTitleError.REQUIRED),
                    })}
                    type="text"
                    placeholder="painting title"
                    value={title}
                    onChange={(event) => handleTextInputChange(event, setTitle)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>

                {(errors.includes(InputTitleError.TITLE)) && (
                  <p className="help is-danger">{InputTitleError.TITLE}</p>
                )}

                {errors.includes(InputTitleError.LENGTH) && (
                  <p className="help is-danger">{InputTitleError.LENGTH}</p>
                )}

                {errors.includes(InputTitleError.REQUIRED) && (
                  <p className="help is-danger">{InputTitleError.REQUIRED}</p>
                )}
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
                    className={classNames('input', {
                      'is-danger': errors.includes(InputYearError.YEAR)
                      || errors.includes(InputYearError.MIN)
                      || errors.includes(InputYearError.REQUIRED),
                    })}
                    type="text"
                    placeholder="year of creation"
                    value={year}
                    onChange={(event) => handleNumberInputChange(event, setYear)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>

                {(errors.includes(InputYearError.YEAR)) && (
                  <p className="help is-danger">{InputYearError.YEAR}</p>
                )}

                {errors.includes(InputYearError.MIN) && (
                  <p className="help is-danger">{InputYearError.MIN}</p>
                )}

                {errors.includes(InputYearError.REQUIRED) && (
                  <p className="help is-danger">{InputYearError.REQUIRED}</p>
                )}
              </div>

              <div className="field profile-item">
                <label className="label">Price</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.includes(InputPriceError.PRICE)
                      || errors.includes(InputPriceError.REQUIRED),
                    })}
                    type="text"
                    placeholder="price €"
                    value={price}
                    onChange={(event) => handleNumberInputChange(event, setPrice)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>

                {errors.includes(InputPriceError.PRICE) && (
                  <p className="help is-danger">{InputPriceError.PRICE}</p>
                )}

                {errors.includes(InputPriceError.REQUIRED) && (
                  <p className="help is-danger">{InputPriceError.REQUIRED}</p>
                )}
              </div>
            </div>

            <div className="profile-info">
              <div className="field profile-item">
                <label className="label">Width</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.includes(InputWidthError.MIN)
                      || errors.includes(InputWidthError.MAX)
                      || errors.includes(InputWidthError.REQUIRED),
                    })}
                    type="text"
                    placeholder="width cm"
                    value={width}
                    onChange={(event) => handleNumberInputChange(event, setWidth)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>


                {(errors.includes(InputWidthError.MIN)) && (
                  <p className="help is-danger">{InputWidthError.MIN}</p>
                )}

                {errors.includes(InputWidthError.MAX) && (
                  <p className="help is-danger">{InputWidthError.MAX}</p>
                )}

                {errors.includes(InputWidthError.REQUIRED) && (
                  <p className="help is-danger">{InputWidthError.REQUIRED}</p>
                )}
              </div>

              <div className="field profile-item">
                <label className="label">Height</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.includes(InputHeightError.MIN)
                      || errors.includes(InputHeightError.MAX)
                      || errors.includes(InputHeightError.REQUIRED),
                    })}
                    type="text"
                    placeholder="height cm"
                    value={height}
                    onChange={(event) => handleNumberInputChange(event, setHeight)}
                  />
                  <span className="icon is-small is-left">
                    {element}
                  </span>
                </div>

                {(errors.includes(InputHeightError.MIN)) && (
                  <p className="help is-danger">{InputHeightError.MIN}</p>
                )}

                {errors.includes(InputHeightError.MAX) && (
                  <p className="help is-danger">{InputHeightError.MAX}</p>
                )}

                {errors.includes(InputHeightError.REQUIRED) && (
                  <p className="help is-danger">{InputHeightError.REQUIRED}</p>
                )}
              </div>
            </div>

            <div className="profile-info">
              <Checkbox checkboxItem='styles' onSelect={setStyleId} />
              <Checkbox checkboxItem='mediums' onSelect={setMediumId} />
              <Checkbox checkboxItem='supports' onSelect={setSupportId} />
            </div>

            <div className="field profile-item-about">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className={classNames('textarea', 'profile-item', {
                    'is-danger': errors.includes(InputDescriptionError.MAX)
                    || errors.includes(InputDescriptionError.REQUIRED),
                  })}
                  placeholder="write a short description about painting"
                  value={description}
                  onChange={(event) => handleTextInputChange(event, setDescription)}
                />
              </div>

              {(errors.includes(InputDescriptionError.MAX)) && (
                <p className="help is-danger">{InputDescriptionError.MAX}</p>
              )}

              {errors.includes(InputDescriptionError.REQUIRED) && (
                <p className="help is-danger">{InputDescriptionError.REQUIRED}</p>
              )}
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