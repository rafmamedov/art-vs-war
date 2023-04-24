import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import '../pages/Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Author } from '../types/painting';
import classNames from 'classnames';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { InputAboutError, InputCityError, InputCountryError, InputNameError } from '../types/errors';

const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=';
const UPDATEAUTHOR = 'https://www.albedosunrise.com/authors';
const element = <FontAwesomeIcon className="far" icon={faArrowRight} />;
const icon = <FontAwesomeIcon className="fas" icon={faUser} />;
// const uploadIcon = <FontAwesomeIcon className="far" icon={faUpload} />;
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
  const [errors, setErrors] = useState(['']);
  const [shortStory, setShortStory] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { user, route } = useAuthenticator((context) => [context.route]);
  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const isAuthenticated = route === 'authenticated';

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


  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>
  ) => {
    setErrors(['']);

    if (!isNumber.test(event.target.value)) {
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
          };

            axios.post(UPDATEAUTHOR, authorDataPost, { headers })
            .then(response => {
              setAuthor(response.data);
              setIsAdded(true);
            })
            .catch(error => {
              setIsAdded(false);
              setErrors(
                error.response.data.errors.map((error: Error) => error.message),
              );
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
      };

      axios.post(UPDATEAUTHOR, authorDataPost, { headers })
      .then(response => {
        setAuthor(response.data);
        setIsAdded(true);
      })
      .catch(error => {
        setIsAdded(false);
        setErrors(
          error.response.data.errors.map((error: Error) => error.message),
        );
      });
    };
  };

  const onUpdateInfo = async () => {
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
      setErrors(error.response.data.errors.map((error: Error) => error.message));
    })
  };

  const onUpdateProfile = async () => {
    setErrors(['']);

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
              console.log(response);
              setAuthor(response.data);
              setIsAdded(true);
            })
            .catch(error => {
              setIsAdded(false);
              setErrors(error.response.data.errors.map((error: Error) => error.message));
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
      onUpdateInfo();
    };
  };

  const onSubmit = () => {
    if (!isAuthenticated) {
      return;
    };

    if (!name.length) {
      setErrors((prevErrors) => [...prevErrors, InputNameError.REQUIRED]);
    };

    if (!country.length) {
      setErrors((prevErrors) => [...prevErrors, InputCountryError.REQUIRED]);
    }

    if (!city.length) {
      setErrors((prevErrors) => [...prevErrors, InputCityError.REQUIRED]);
    }

    if (!shortStory.length) {
      setErrors((prevErrors) => [...prevErrors, InputAboutError.REQUIRED]);
    }

    author ? onUpdateProfile() : onCreateProfile();
  };

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
    setErrors(['']);
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
          <label className="label">Full Name</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames('input', {
                'is-danger': errors.includes(InputNameError.NAME)
                || errors.includes(InputNameError.LENGTH)
                || errors.includes(InputNameError.REQUIRED),
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
          {(errors.includes(InputNameError.NAME)) && (
            <p className="help is-danger">{InputNameError.NAME}</p>
          )}

          {errors.includes(InputNameError.LENGTH) && (
            <p className="help is-danger">{InputNameError.LENGTH}</p>
          )}

          {errors.includes(InputNameError.REQUIRED) && (
            <p className="help is-danger">{InputNameError.REQUIRED}</p>
          )}
        </div>

        <div className="field profile-item">
          <label className="label">Change profile photo</label>
          <div className="file has-name is-right">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="resume"
                onChange={onFileChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              <span className="file-name">
                {selectedImage?.name || 'choose a file'}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <div className="field profile-item">
          <label className="label">Country</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames('input', {
                'is-danger': errors.includes(InputCountryError.COUNTRY)
                || errors.includes(InputCountryError.LENGTH)
                || errors.includes(InputCountryError.REQUIRED),
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

          {(errors.includes(InputCountryError.COUNTRY)) && (
            <p className="help is-danger">{InputCountryError.COUNTRY}</p>
          )}

          {errors.includes(InputCountryError.LENGTH) && (
            <p className="help is-danger">{InputCountryError.LENGTH}</p>
          )}

          {errors.includes(InputCountryError.REQUIRED) && (
            <p className="help is-danger">{InputCountryError.REQUIRED}</p>
          )}
        </div>

        <div className="field profile-item">
          <label className="label">City</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames('input', {
                'is-danger': errors.includes(InputCityError.CITY)
                || errors.includes(InputCityError.LENGTH)
                || errors.includes(InputCityError.REQUIRED),
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

          {(errors.includes(InputCityError.CITY)) && (
            <p className="help is-danger">{InputCityError.CITY}</p>
          )}

          {errors.includes(InputCountryError.LENGTH) && (
            <p className="help is-danger">{InputCountryError.LENGTH}</p>
          )}

          {errors.includes(InputCountryError.REQUIRED) && (
            <p className="help is-danger">{InputCountryError.REQUIRED}</p>
          )}
        </div>
      </div>

      <div className="field profile-item-about">
        <label className="label">About me:</label>
        <div className="control">
          <textarea
            className={classNames('textarea', 'profile-item', {
              'is-danger': errors.includes(InputAboutError.ABOUT)
              || errors.includes(InputAboutError.LENGTH)
              || errors.includes(InputAboutError.REQUIRED),
            })}
            placeholder="write a short story about you"
            value={shortStory}
            onChange={(event) => handleInputChange(event, setShortStory)}
          />
        </div>

        {(errors.includes(InputAboutError.ABOUT)) && (
          <p className="help is-danger">{InputAboutError.ABOUT}</p>
        )}

        {errors.includes(InputAboutError.LENGTH) && (
          <p className="help is-danger">{InputAboutError.LENGTH}</p>
        )}

        {errors.includes(InputAboutError.REQUIRED) && (
          <p className="help is-danger">{InputAboutError.REQUIRED}</p>
        )}
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
