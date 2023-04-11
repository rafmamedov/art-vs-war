import React from 'react';
import '../styles.scss'
import 'bulma/css/bulma.css';

export const JoinUs: React.FC = () => (
  <section id="authors" className="section join-us">
    <div className="container join-us-items">
      <div className="join-us-item-1">
        <div className="subtitle is-3">
          Are you an artist? Join us!
        </div>

        <div className="subtitle is-4">
          Click the button and fill in the form
        </div>

        <button className="button is-light button-auth">Log in</button>
      </div>

      <div className="join-us-item-2">
        <div className="join-us-img-1"></div>
        <div className="join-us-img-2"></div>
      </div>
    </div>
  </section>
);
