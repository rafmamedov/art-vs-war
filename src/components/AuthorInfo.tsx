import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import { faLocationDot, faPaintBrush, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Author, Painting } from '../types/painting';
import axios from 'axios';

const locationIcon = <FontAwesomeIcon className="far" icon={faLocationDot} />;
const paintbrushIcon = <FontAwesomeIcon className="far" icon={faPaintBrush} />;
const paletteIcon = <FontAwesomeIcon className="far" icon={faPalette} />;

const GETALLPAINTINGS = 'https://www.albedosunrise.com/paintings/by-author?authorId='

type Props = {
  author: Author;
};

export const AuthorInfo: React.FC<Props> = ({ author}) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const styles = paintings.map(painting => painting.style.name).join(', ');
  const supports = paintings.map(painting => painting.support.name).join(', ');
  const mediums = paintings.map(painting => painting.medium.name).join(', ');

  const getAllPaintingsByAuthor = async () => {
    axios.get(GETALLPAINTINGS + author.id)
      .then(response => {
        setPaintings(response.data.paintings);
      })
      .catch(error => console.log(error))
  };

  useEffect(() => {
    getAllPaintingsByAuthor();
  }, [])

  console.log(styles);
  return (
    <div className="container sidebar-info">
      <div className="profile-header">
        <div className="author-image"></div>

        <div className="author-info">
          <div className="author-subtitle"><strong>{author.fullName}</strong></div>
          <div className="author-subtitle">
            {locationIcon} {author.country}, {author.city}
          </div>
          <div className="author-subtitle">
          {paletteIcon} <strong>preferred styles:</strong> {styles}
          </div>

          <div className="author-subtitle">
            {paintbrushIcon} <strong>preferred mediums:</strong> {mediums}
          </div>

          <div className="author-subtitle">
            {paletteIcon} <strong>preferred supports:</strong> {supports}
          </div>
        </div>

        <div className="block">
          <strong>About me:</strong> {author.aboutMe}
        </div>
      </div>
    </div>
  );
};
