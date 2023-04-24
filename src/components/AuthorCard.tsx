import React from 'react';
import { Author } from '../types/painting';

type Props = {
  author: Author;
};

export const AuthorCard: React.FC<Props> = ({ author }) => {

  return (
    <div className="card authors-card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="placeholder" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">John Smith</p>
            <p className="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
        </div>
      </div>
    </div>
  );
};