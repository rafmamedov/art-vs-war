import React from 'react';

export const Results: React.FC = () => (
  <section className="section results">
    <div className="title results-title">Our Results in Numbers</div>

    <div className="container results-items">
      <div className="subtitle is-4 results-item">
        Paintings in database
        <div className="subtitle is-3">
          567
        </div>
      </div>

      <div className="subtitle is-4 results-item">
        Raised funds
        <div className="subtitle is-3">
          1000000 €
        </div>
      </div>

      <div className="subtitle is-4 results-item">
        Artists
        <div className="subtitle is-3">
          45
        </div>
      </div>
    </div>
  </section>
);
