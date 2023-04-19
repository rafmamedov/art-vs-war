import React from 'react';

export const Results: React.FC = () => (
  <section className="section results">
    <div className="title is-2 results-title">Our Results in Numbers</div>

    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading is-1">Paintings in database</p>
          <p className="title is-1">567</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Raised funds</p>
          <p className="title is-1">1000000 €</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Artists in community</p>
          <p className="title is-1">45</p>
        </div>
      </div>
    </nav>
  </section>
);
