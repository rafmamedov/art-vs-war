import React from 'react';

export const Footer: React.FC = () => (
  <section className="section footer">
    <div className="container footer-container">
      <div className="footer-title">
        <div className="subtitle is-3">Art vs War</div>
        <div className="subtitle is-4">2023</div>
      </div>

      <div className="footer-navbar">
        <a href="#gallery" className="navlink">Gallery</a>
        <a href="#authors" className="navlink">Authors</a>
        <a href="#united24" className="navlink">United24</a>
        <a href="#about" className="navlink">About</a>
      </div>
    </div>

    <div className="container footer-end">
      <span className="footer-created">Created by Art vs War Team</span>
      <span className="footer-license">
        © This work is licensed under the terms of 
        <br/>
        the GNU General Public License 2.0
      </span>
    </div>
  </section>
);
