import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="section header">
      <div className="title-container">
        <h1 className="title-main">Purchase <strong className="has-text-info">Art</strong>
        <br className="title-br"/> Help <strong className="title-ua">Ukraine</strong></h1>
        <Link
          to="/gallery"
          className="button button-get-all"
        >
          View Collection
        </Link>
      </div>
    </div>
  );
};
