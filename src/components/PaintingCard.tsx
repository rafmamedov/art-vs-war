import React from 'react';
import { Painting } from '../types/painting';
import { Link } from 'react-router-dom';

type Props = {
  painting: Painting;
};

export const PaintingCard: React.FC<Props> = ({ painting }) => {
  const { title, author, imageUrl } = painting;

  return (
    <Link to={`/painting`}>
      <div className="card collection-card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              className="painting-image"
              src={imageUrl}
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle is-6"><strong>{painting.style.name}</strong>
                <br/>{painting.medium.name}, {painting.support.name}
                <br/>{painting.width} x {painting.height} cm
              </p>
              <p className="collection-card-title">{title.slice(0, -2)}</p>
              <p className="collection-card-subtitle">{painting.author.name}</p>
              <p className="subtitle is-4">€ {painting.price}</p>
            </div>
          </div>
          <div className="content">
            {painting.description}
          </div>
        </div>
      </div>
    </Link>
  );
};
