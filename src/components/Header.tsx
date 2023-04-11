import React from 'react';
import { Link } from 'react-router-dom';
import { Gallery } from '../pages/Gallery';

type Props = {
  getAll: () => void;
};

export const Header: React.FC<Props> = ({ getAll }) => {
  return (
    <div className="section header">
      <div className="title-container">
        <h1 className="title-main">Purchase <strong>Art</strong>
        <br className="title-br"/> Help <strong className="title-ua">Ukraine</strong></h1>
        <Link
          to="/gallery"
          className="button button-get-all"
          onClick={getAll}
        >
          View Collection
        </Link>
      </div>
    </div>
  );
};
