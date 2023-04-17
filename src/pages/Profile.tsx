import React, { useState } from 'react';
import './Profile.scss'
import '../styles.scss'
import { ProfileEdit } from '../components/ProfileEdit';
import { MyPaintings } from './MyPaintings';
import { CreatePainting } from '../components/CreatePainting';
import { faGlobe, faPaintBrush, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const globeIcon = <FontAwesomeIcon className="far" icon={faGlobe} />;
const paintbrushIcon = <FontAwesomeIcon className="far" icon={faPaintBrush} />;
const paletteIcon = <FontAwesomeIcon className="far" icon={faPalette} />;

// const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=jpeg';

export const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [country, setCountry] = useState('');
  const [shortStory, setShortStory] = useState('');
  const [description, setDescription] = useState('');
  const [isEditVisible, setIsEditVisible] = useState(true);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isPaintingsVisible, setIsPaintingsVisible] = useState(false);

  return (
    <section className="section profile">
      <div className="tabs profile-tabs">
        <ul>
          <li>
            <div
              className={classNames('profile-tabs-link', {
                'is-active': !isPaintingsVisible,
              })}
              onClick={() => setIsPaintingsVisible(false)}
            >
              Profile
            </div>
          </li>
          <li>
            <div
              className={classNames('profile-tabs-link', {
                'is-active': isPaintingsVisible,
              })}
              onClick={() => setIsPaintingsVisible(true)}
            >
              My paintings
            </div>
          </li>
        </ul>
      </div>

      {isPaintingsVisible
        ? (
          <MyPaintings />
        ) : (
          <div className="container sidebar-info">
            <div className="profile-header">
              <div className="author-image"></div>

              <div className="author-info">
                <div className="author-subtitle"><strong>Rafael Mamedov</strong></div>
                <div className="author-subtitle">
                  {globeIcon} Ukraine, Kyiv
                </div>

                <button
                    className={classNames(
                      'button-get-all',
                      'button-edit',
                      'button', {
                        'is-dark': isEditVisible,
                      })}
                    onClick={() => {
                      setIsEditVisible(true)
                      setIsCreateVisible(false);
                    }}
                  >
                    Edit info
                  </button>

                <button
                  className="button is-warning button-get-all"
                  onClick={() => {
                    setIsEditVisible(false);
                    setIsCreateVisible(true);
                  }}
                >
                  Create Painting
                </button>
              </div>
            </div>

            {isEditVisible && (
              <ProfileEdit
                name={name}
                city={city}
                about={shortStory}
                country={country}
                setName={setName}
                setCity={setCity}
                setAbout={setShortStory}
                setCountry={setCountry}
                setIsVisible={setIsEditVisible}
              />
            )}

            {isCreateVisible && (
              <CreatePainting
                name={name}
                year={year}
                title={title}
                price={price}
                width={width}
                height={height}
                setYear={setYear}
                setPrice={setPrice}
                setTitle={setTitle}
                setWidth={setWidth}
                setHeight={setHeight}
                description={description}
                setDescription={setDescription}
              />
            )}
          </div>
        )}
    </section>
  );
};