import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import '../pages/Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
  name: string,
  city: string;
  about: string;
  country: string;
  setName: React.Dispatch<SetStateAction<string>>;
  setCity: React.Dispatch<SetStateAction<string>>;
  setAbout: React.Dispatch<SetStateAction<string>>;
  setCountry: React.Dispatch<SetStateAction<string>>;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
};

const element = <FontAwesomeIcon className="far" icon={faArrowRight} />;

export const ProfileEdit: React.FC<Props> = ({
  name,
  city,
  about,
  country,
  setName,
  setCity,
  setAbout,
  setCountry,
  setIsVisible,
}) => {
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
              placeholder="country origin"
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
          <label className="label">Town</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="town origin"
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
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button button-submit is-dark"
            onClick={() => setIsVisible(false)}
          >
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button button-submit is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
};
