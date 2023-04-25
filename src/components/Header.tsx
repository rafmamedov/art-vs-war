import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="section header">
      <section className="hero is-light is-large">
        <div className="hero-body">
          <div className="container has-text-centered">
          <p className="title-main">Purchase <strong className="has-text-info">Art</strong>
          <br className="title-br"/> Help <strong className="title-ua">Ukraine</strong></p>
          <Link
            to="/gallery"
            className="button button-get-all"
          >
            View Collection
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
