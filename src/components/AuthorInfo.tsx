import React from 'react';
import 'bulma/css/bulma.css';
import { faLocationDot, faPaintBrush, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Author } from '../types/painting';

const locationIcon = <FontAwesomeIcon className="far" icon={faLocationDot} />;
const paintbrushIcon = <FontAwesomeIcon className="far" icon={faPaintBrush} />;
const paletteIcon = <FontAwesomeIcon className="far" icon={faPalette} />;

type Props = {
  author: Author;
};

export const AuthorInfo: React.FC<Props> = ({ author}) => {
  return (
    <div className="container sidebar-info">
      <div className="profile-header">
        <div className="author-image"></div>

        <div className="author-info">
          <div className="author-subtitle"><strong>{author.fullName}</strong></div>
          <div className="author-subtitle">
            {locationIcon} {author.country}, {author.city}
          </div>
          <div className="author-subtitle">{paintbrushIcon} Art movement: </div>
          <div className="author-subtitle">{paletteIcon} Materials: </div>
        </div>

        <div className="block">
          <strong>About me:</strong> {author.aboutMe}
        </div>
      </div>
    </div>
  );
};
