import React, { useEffect, useState } from 'react';
import '../pages/Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Auth } from 'aws-amplify';

const UPDATEAUTHOR = 'https://www.albedosunrise.com/authors';
const element = <FontAwesomeIcon className="far" icon={faArrowRight} />;

type Props = {
  getAuthor: () => void;
};

export const ProfileEdit: React.FC<Props> = ({ getAuthor }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [shortStory, setShortStory] = useState('');

  const onProfileUpdate = async () => {
    const authorDataPut = {
      fullName: name,
      country,
      city,
      aboutMe: shortStory,
    };

    Auth.currentSession()
      .then(response => {
        const accessToken = response.getAccessToken().getJwtToken();

        const headers = {
          'Authorization': `Bearer ${accessToken}`,
        }

        axios.put(UPDATEAUTHOR, authorDataPut, { headers })
      })
      .finally(() => {
        onCancelEditing();
      });
  };

  useEffect(() => {
    getAuthor();
  }, [onProfileUpdate]);

  const onCancelEditing = () => {
    setName('');
    setCity('');
    setCountry('');
    setShortStory('');
  }

  return (
    <div className="profile-container">
      <div className="field profile-item-about">
        <label className="label">Full Name</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="text"
            placeholder="full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          <span className="icon is-small is-left">
            {element}
          </span>
        </div>
      </div>

      <div className="profile-info">
        <div className="field profile-item">
          <label className="label">Country</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="country of current stay"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
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
          <label className="label">City</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="city of current stay"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <span className="icon is-small is-left">
              {element}
            </span>
          </div>
        </div>
      </div>

      <div className="field profile-item-about">
        <label className="label">About me:</label>
        <div className="control">
          <textarea
            className="textarea profile-item"
            placeholder="write a short story about you"
            value={shortStory}
            onChange={(event) => setShortStory(event.target.value)}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button button-submit is-dark"
            onClick={onProfileUpdate}
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
