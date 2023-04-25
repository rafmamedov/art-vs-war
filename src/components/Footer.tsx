import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <section className="section footer">
    <div className="footer-container">
      <div className="footer-title">
        <div className="subtitle is-3">Art vs War</div>
        <div className="subtitle is-4">2023</div>
      </div>

      <div className="footer-navbar">
        <Link to="/gallery" className="navlink">Gallery</Link>
        <Link to="/authors" className="navlink">Authors</Link>
        <a href="#united24" target="_blank" className="navlink">United24</a>
        <Link to="/about" className="navlink">About</Link>
      </div>
    </div>

    <div className="footer-end">
      <span className="footer-created">Created by Art vs War Team</span>
      <span className="footer-license">
        © This work is licensed under the terms of 
        <br/>
        the GNU General Public License 2.0
      </span>
    </div>
  </section>
);
