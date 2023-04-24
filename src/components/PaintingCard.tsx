import React from 'react';
import { Painting } from '../types/painting';
import { Link } from 'react-router-dom';

type Props = {
  painting: Painting;
};

export const PaintingCard: React.FC<Props> = ({ painting }) => {
  const {
    title,
    price,
    style,
    width,
    author,
    height,
    medium,
    support,
    imageUrl,
  } = painting;

  return (
    <div className="card collection-card">
      <Link className="card-link" to={`/gallery/${painting.id}`}>
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              className="painting-image"
              src={imageUrl}
              alt="Placeholder"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle is-6"><strong>{style.name}</strong>
                <br/>{medium.name}, {support.name}
                <br/>{height} x {width} cm
              </p>
              <p className="collection-card-title">{title}</p>
              <p className="collection-card-subtitle">{author.fullName}</p>
              <p className="subtitle is-4">€ {price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
