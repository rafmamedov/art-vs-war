import React from 'react';
import 'bulma/css/bulma.css';
import { faGlobe, faPaintBrush, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const globeIcon = <FontAwesomeIcon className="far" icon={faGlobe} />;
const paintbrushIcon = <FontAwesomeIcon className="far" icon={faPaintBrush} />;
const paletteIcon = <FontAwesomeIcon className="far" icon={faPalette} />;


export const AuthorInfo = () => {
  return (
    <div className="container sidebar-info">
      <div className="profile-header">
        <div className="author-image"></div>

        <div className="author-info">
          <div className="author-subtitle"><strong>Rafael Mamedov</strong></div>
          <div className="author-subtitle">
            {globeIcon} Ukraine, Kyiv
          </div>
          <div className="author-subtitle">{paintbrushIcon} Art movement:</div>
          <div className="author-subtitle">{paletteIcon} Materials: </div>
        </div>

        <div className="block">
          <strong>About me:</strong> As I set out to create this painting, my goal was to capture the essence of Ukraine's
          rich cultural heritage and its close relationship with nature. I wanted to represent
          the country's agricultural roots and its strong sense of national pride, all within a single image.
        </div>
      </div>
    </div>
  );
};
