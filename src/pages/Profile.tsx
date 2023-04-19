import React, { useEffect, useState } from 'react';
import './Profile.scss'
import '../styles.scss'
import { ProfileEdit } from '../components/ProfileEdit';
import { MyPaintings } from './MyPaintings';
import { CreatePainting } from '../components/CreatePainting';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Author } from '../types/painting';
import { useAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';
import { Loader } from '../components/Loader';

const locationIcon = <FontAwesomeIcon className="far" icon={faLocationDot} />;
const GETAUTHOR = 'https://www.albedosunrise.com/authors/';

export const Profile: React.FC = () => {
  const [author, setAuthor] = useState<Author | null>(null)
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isPaintingsVisible, setIsPaintingsVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { user, route } = useAuthenticator((context) => [context.route]);

  const isAuthenticated = route === 'authenticated';

  const getAuthorById = async () => {
    await axios.get(GETAUTHOR + user.username)
      .then((response) => {
        setAuthor(response.data)
      })
      .catch(error => {
        // console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300);
      })
  }

  useEffect(() => {
    getAuthorById();

    if (isAuthenticated) {
      setIsFetching(false);
    }
  }, [route])

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

      {isFetching
        ? (
        <Loader />
        ) : (
          (isPaintingsVisible && author)
            ? (
              <MyPaintings author={author} />
            ) : (
            <div className="container sidebar-info">
              <div className="profile-header">
                <div className="author-image"></div>
  
                <div className="author-info">
                  {(author?.fullName || author?.city || author?.country) && (
                    <>
                      <div className="author-subtitle"><strong>{author?.fullName}</strong></div>
                      <div className="author-subtitle">
                        {locationIcon} {author?.country}, {author?.city}
                      </div>
                    </>
                  )}
  
                  <button
                      className={classNames(
                        'button-get-all',
                        'button-edit',
                        'button', {
                          'is-dark': !isCreateVisible,
                        })}
                      onClick={() => {
                        setIsCreateVisible(false);
                      }}
                    >
                      Edit info
                    </button>
  
                  <button
                    className="button is-warning button-get-all"
                    onClick={() => {
                      setIsCreateVisible(true);
                    }}
                  >
                    Create Painting
                  </button>
                </div>
              </div>
  
              {isCreateVisible
                ? (
                <CreatePainting name={author?.fullName || ''} />
                ) : (
                <ProfileEdit getAuthor={getAuthorById} />
                )}
            </div>
          )
        )}
    </section>
  );
};