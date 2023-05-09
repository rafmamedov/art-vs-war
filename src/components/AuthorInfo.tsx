import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Author, Painting } from '../types/painting';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  faLocationDot,
  faPaintBrush,
  faPalette,
  faSquare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const GETALLPAINTINGS = 'https://www.albedosunrise.com/paintings/by-author/'
const supportsIcon = <FontAwesomeIcon className="" icon={faSquare} />;
const paletteIcon = <FontAwesomeIcon className="far" icon={faPalette} />;
const element = <FontAwesomeIcon className="icon-cross" icon={faXmark} />;
const locationIcon = <FontAwesomeIcon className="far" icon={faLocationDot} />;
const paintbrushIcon = <FontAwesomeIcon className="far" icon={faPaintBrush} />;

type Props = {
  author: Author;
};

export const AuthorInfo: React.FC<Props> = ({ author}) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const styles = paintings.map(painting => painting.style.name);
  const supports = paintings.map(painting => painting.support.name);
  const mediums = paintings.map(painting => painting.medium.name);
  const navigate = useNavigate();
  
  const removeDublicates = (array: string[]) => {
    const result: string[] = [];

    array.forEach(item => {
      if (!result.includes(item)) {
        result.push(item);
      }
    });

    return result.join(', ');
  }

  const getAllPaintingsByAuthor = async () => {
    axios.get(GETALLPAINTINGS + author.id)
      .then(response => {
        setPaintings(response.data.entities);
      })
      .catch(error => console.log(error))
  };

  useEffect(() => {
    getAllPaintingsByAuthor();
  }, [])

  return (
    <div className="container sidebar-info">
      <div className="profile-header-icon">
        <span className="authors-link" onClick={() => navigate(-1)}>{element}</span>
      </div>
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

          {styles.length > 0 && (
            <div className="author-subtitle">
              {paletteIcon} <strong>styles: </strong> {removeDublicates(styles)}
            </div>
          )}

          {mediums.length > 0 && (
            <div className="author-subtitle">
              {paintbrushIcon} <strong>mediums: </strong> {removeDublicates(mediums)}
            </div>
          )}

            {supports.length > 0 && (
              <div className="author-subtitle">
                {supportsIcon} <strong>supports: </strong> {removeDublicates(supports)}
              </div>
            )}
        </div>
      </div>

      <div className="block profile-header-about">
        <strong>About me:</strong> {author.aboutMe}
      </div>
    </div>
  );
};
