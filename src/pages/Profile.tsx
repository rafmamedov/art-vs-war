import React, { useEffect, useState } from 'react';
import '../styles/Profile.scss'
import '../styles/styles.scss'
import 'bulma/css/bulma.css';
import axios from 'axios';
import classNames from 'classnames';
import { Author } from '../types/painting';
import { MyPaintings } from './MyPaintings';
import { Loader } from '../components/Loader';
import { ProfileEdit } from '../components/ProfileEdit';
import { CreatePainting } from '../components/CreatePainting';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GETAUTHOR = 'https://www.albedosunrise.com/authors/';

const locationIcon = <FontAwesomeIcon className="far" icon={faLocationDot} />;

export const Profile: React.FC = () => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isPaintingsVisible, setIsPaintingsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const { user } = useAuthenticator((context) => [context.user]);

  const getAuthorById = async () => {
    await axios.get(GETAUTHOR + user.username)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300);
      })
  };

  useEffect(() => {
    getAuthorById();
  }, [isAdded])

  useEffect(() => {
    setTimeout(() => {
      setIsFetching(false);
    }, 1000)
  }, []);

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

          {author && (
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
          )}
        </ul>
      </div>

      {isFetching && <Loader />}

      {(isPaintingsVisible && author && !isFetching) && (
        <MyPaintings
          author={author}
          isAuthor={true}
        />
      )}

      {(!isPaintingsVisible && !isFetching) && (
        <div className="container sidebar-info">
          {author && (
            <div className="profile-header">
            {author.photoUrl
              ? (
                <img src={author.photoUrl} className="author-image" alt="author" />
              ) : (
                <img
                  src="https://i.etsystatic.com/17358183/r/il/7a5539/3875154600/il_794xN.3875154600_9zse.jpg"
                  className="author-image"
                  alt="author"
                />
              )}

            <div className="author-info">
              <div className="author-subtitle"><strong>{author.fullName}</strong></div>
              <div className="author-subtitle">
                {locationIcon} {author.country}, {author.city}
              </div>

              <button
                className={classNames('button', {
                  'is-info': !isCreateVisible,
                  'is-warning': isCreateVisible,
                })}
                onClick={() => {setIsCreateVisible(!isCreateVisible)}}
              >
                {isCreateVisible ? 'Edit Profile Info' : 'Create Painting'}
              </button>
            </div>
          </div>
          )}

          {isCreateVisible
            ? <CreatePainting />
            : (
            <ProfileEdit
              author={author}
              isAdded={isAdded}
              hasError={hasError}
              setAuthor={setAuthor}
              setIsAdded={setIsAdded}
              setHasError={setHasError}
            />
          )}
        </div>
      )}
    </section>
  );
};