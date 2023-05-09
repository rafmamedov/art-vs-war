import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import '../styles/Profile.scss'
import { Error } from '../types/errors';
import { Author } from '../types/painting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUpload, faUser} from '@fortawesome/free-solid-svg-icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';

const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=';
const UPDATEAUTHOR = 'https://www.albedosunrise.com/authors';
const element = <FontAwesomeIcon className="far" icon={faArrowRight} />;
const uploadIcon = <FontAwesomeIcon className="far" icon={faUpload} />;
const icon = <FontAwesomeIcon className="fas" icon={faUser} />;
const isNumber = /^\d+$/;

type Props = {
  isAdded: boolean;
  hasError: boolean;
  author: Author | null;
  setAuthor: React.Dispatch<SetStateAction<Author | null>>;
  setIsAdded: React.Dispatch<SetStateAction<boolean>>;
  setHasError: React.Dispatch<SetStateAction<boolean>>;
};

export const ProfileEdit: React.FC<Props> = ({
  author,
  isAdded,
  hasError,
  setAuthor,
  setIsAdded,
  setHasError,
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [shortStory, setShortStory] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { user, route } = useAuthenticator((context) => [context.route]);
  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const isAuthenticated = route === 'authenticated';
  const userEmail = user.attributes?.email;

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const notificationSuccess = (
    <div className="notification is-success profile-item-about">
      <button
        className="delete"
        onClick={() => setIsAdded(false)}
      />
      Profile is successfuly edited!
    </div>
  );

  const notificationError = (
    <div className="notification is-danger profile-item-about">
      <button
        className="delete"
        onClick={() => setHasError(false)}
      />
      Something went wrong!
    </div>
  );

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (author) {
      setName(author.fullName);
      setCountry(author.country);
      setCity(author.city);
      setShortStory(author.aboutMe);
    }
  }, [author]);

  console.log(user);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>,
  ) => {
    setErrors([]);

    if (!isNumber.test(event.target.value) || event.target.value === '') {
      setState(event.target.value);
    }
  }

  const onCreateProfile = async () => {
    if (selectedImage) {
      await axios.get(UPLOAD + selectedImage.type.split('/')[1])
      .then(response => {
        const {
          imagePutUrl,
          imageFileName,
        } = response.data;

        selectedImage && axios.put(imagePutUrl, selectedImage)
        .then(response => {
          const authorDataPost = {
            fullName: name,
            country,
            city,
            aboutMe: shortStory,
            imageFileName,
            email: userEmail,
          };

            axios.post(UPDATEAUTHOR, authorDataPost, { headers })
            .then(response => {
              setAuthor(response.data);
              setIsAdded(true);
            })
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
      });
    } else {
      const authorDataPost = {
        fullName: name,
        country,
        city,
        aboutMe: shortStory,
        email: userEmail,
      };

      axios.post(UPDATEAUTHOR, authorDataPost, { headers })
      .then(response => {
        setAuthor(response.data);
        setIsAdded(true);
      })
      .catch(error => {
        setIsAdded(false);
        setErrors(error.response.data.errors
          .map((error: Error) => ({
            message: error.message,
            field: error.field,
          })));
      })
    };
  };

  const updateInfo = async () => {
    const authorDataPut = {
      fullName: name,
      country,
      city,
      aboutMe: shortStory,
    };

    axios.put(UPDATEAUTHOR, authorDataPut, { headers })
    .then(response => {
      setAuthor(response.data);
      setIsAdded(true);
    })
    .catch(error => {
      setIsAdded(false);
      setErrors(error.response.data.errors
        .map((error: Error) => ({
          message: error.message,
          field: error.field,
        })));
    });
  };

  const onUpdateProfile = async () => {
    if (selectedImage) {
      await axios.get(UPLOAD + selectedImage.type.split('/')[1])
      .then(response => {
        const {
          imagePutUrl,
          imageFileName,
        } = response.data;

        selectedImage && axios.put(imagePutUrl, selectedImage)
          .then(response => {
            const authorDataPut = {
              fullName: name,
              country,
              city,
              aboutMe: shortStory,
              imageFileName,
            };

            axios.put(UPDATEAUTHOR, authorDataPut, { headers })
            .then(response => {
              setAuthor(response.data);
              setIsAdded(true);
            })
            .catch(error => {
              setIsAdded(false);
              setErrors(error.response.data.errors.map((error: Error) => ({
                  message: error.message,
                  field: error.field,
                })))
            });
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      updateInfo();
    }
  };

  const onSubmit = () => {
    setErrors([]);

    if (!isAuthenticated) {
      return;
    };

    author ? onUpdateProfile() : onCreateProfile();
  };

  const getErrors = (field: string) => {
    const inputWithError = errors.find(error => error.field === field);

    return inputWithError && (
      <p className="help is-danger">{inputWithError?.message}</p>
    )
  }

  useEffect(() => {
    setTimeout(() => {
      setIsAdded(false);
      setHasError(false);
    }, 3000);
  }, [isAdded, hasError]);

  const onCancelEditing = () => {
    setName('');
    setCity('');
    setCountry('');
    setShortStory('');
    setSelectedImage(null);
    setErrors([]);
  }

  return (
    <div className="profile-container">
      {hasError && (
        <div
          className={classNames('modal', {
          'is-active': hasError,
        })}
        >
          <div className="modal-background"></div>
          <div className="modal-content">
            {notificationError}
          </div>
        </div>
      )}

      {isAdded && (
        <div
          className={classNames('modal', {
            'is-active': isAdded,
          })}
        >
          <div className="modal-background"></div>
          <div className="modal-content">
            {notificationSuccess}
          </div>
        </div>
      )}

      <div className="profile-info">
        <div className="field profile-item">
          <label className="label required-field">Full Name</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames('input', {
                'is-danger': errors.some(error => error.field === 'fullName'),
              })}
              type="text"
              placeholder="full name"
              value={name}
              onChange={(event) => handleInputChange(event, setName)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
              {icon}
            </span>
            <span className="icon is-small is-left">
              {element}
            </span>
          </div>

          {getErrors('fullName')}
        </div>

        <div className="field profile-item">
          <label className="label">Change profile photo</label>
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
          <label className="label required-field">Country</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames('input', {
                'is-danger': errors.some(error => error.field === 'country'),
              })}
              type="text"
              placeholder="country of current stay"
              value={country}
              onChange={(event) => handleInputChange(event, setCountry)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            <span className="icon is-small is-left">
              {element}
            </span>
          </div>

          {getErrors('country')}
        </div>

        <div className="field profile-item">
          <label className="label required-field">City</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames('input', {
                'is-danger': errors.some(error => error.field === 'city'),
              })}
              type="text"
              placeholder="city of current stay"
              value={city}
              onChange={(event) => handleInputChange(event, setCity)}
              required
            />
            <span className="icon is-small is-left">
              {element}
            </span>
          </div>

          {getErrors('city')}
        </div>
      </div>

      <div className="field profile-item-about">
        <label className="label required-field">About me:</label>
        <div className="control">
          <textarea
            className={classNames('textarea', 'profile-item', {
              'is-danger': errors.some(error => error.field === 'aboutMe'),
            })}
            placeholder="write a short story about you"
            value={shortStory}
            onChange={(event) => handleInputChange(event, setShortStory)}
          />
        </div>

        {getErrors('aboutMe')}
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
            onClick={onCancelEditing}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
