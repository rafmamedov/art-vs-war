import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '../pages/Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Checkbox } from './Checkbox';
import classNames from 'classnames';
import { Error } from '../types/errors';

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
  const [errors, setErrors] = useState<Error[]>([]);
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
    setErrors([]);

    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleTextInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>
  ) => {
    setErrors([]);

    if (!isNumber.test(event.target.value) || event.target.value === '') {
      setState(event.target.value);
    }
  }

  const handleNumberInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>
  ) => {
    setErrors([]);

    if (isNumber.test(event.target.value) || event.target.value === '') {
      setState(event.target.value);
    }
  }

  const onCreateWithFileUpload = async () => {
    await axios.get(UPLOAD + selectedImage?.type.split('/')[1])
    .then((response) => {
      const {
        imagePutUrl,
        imageFileName,
      } = response.data;

      selectedImage && axios.put(imagePutUrl, selectedImage)
        .then(() => {
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
              setErrors(error.response.data.errors
                .map((error: Error) => ({
                  message: error.message,
                  field: error.field,
                })));
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

  const onCreateWithoutFile = () => {
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
    };

    axios.post(URL, imageDataPost, { headers })
      .then(() => setIsAdded(true))
      .catch(error => {
        setIsAdded(false);
        setErrors(error.response.data.errors
          .map((error: Error) => ({
            message: error.message,
            field: error.field,
          })));
          console.log(error);
      });
  }

  const onSubmit = () => {
    setErrors([]);

    if (!isAuthenticated) {
      return;
    };

    selectedImage ? onCreateWithFileUpload() : onCreateWithoutFile();
  }

  const handleCancelEditing = () => {
    setTitle('');
    setDescription('');
    setYear('');
    setHeight('');
    setWidth('');
    setPrice('');
    setMediumId(0);
    setSupportId(0);
    setStyleId(0);
    setSelectedImage(null);
    setErrors([]);
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

  const getErrors = (field: string) => {
    const inputWithError = errors.find(error => error.field === field);

    return inputWithError && (
      <p className="help is-danger">{inputWithError?.message}</p>
    )
  }

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
                <label className="label required-field">Title</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.some(error => error.field === 'title'),
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

                {getErrors('title')}
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
                      {selectedImage ? selectedImage?.name : 'Choose a file'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div className="field profile-item">
                <label className="label required-field">Year</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.some(error => error.field === 'yearOfCreation'),
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

                {getErrors('yearOfCreation')}
              </div>

              <div className="field profile-item">
                <label className="label required-field">Price</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.some(error => error.field === 'price'),
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

                {getErrors('price')}
              </div>
            </div>

            <div className="profile-info">
              <div className="field profile-item">
                <label className="label required-field">Width</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.some(error => error.field === 'width'),
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


                {getErrors('width')}
              </div>

              <div className="field profile-item">
                <label className="label required-field">Height</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={classNames('input', {
                      'is-danger': errors.some(error => error.field === 'height'),
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

                {getErrors('height')}
              </div>
            </div>

            <div className="profile-info">
              <Checkbox checkboxItem='styles' onSelect={setStyleId} getErrors={getErrors} />
              <Checkbox checkboxItem='mediums' onSelect={setMediumId} getErrors={getErrors} />
              <Checkbox checkboxItem='supports' onSelect={setSupportId} getErrors={getErrors} />
            </div>

            <div className="field profile-item-about">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className={classNames('textarea', 'profile-item', {
                    'is-danger': errors.some(error => error.field === 'description'),
                  })}
                  placeholder="write a short description about painting"
                  value={description}
                  onChange={(event) => handleTextInputChange(event, setDescription)}
                />
              </div>

              {getErrors('description')}
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button button-submit is-dark"
                  onClick={onSubmit}
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