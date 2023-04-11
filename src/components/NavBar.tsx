import React, { useState } from 'react';
import Logo from '../images/LOGO.svg'
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleOpenMenu = () => {
    if (isActive) {
      setIsActive(false);
      document.body.style.overflow = 'unset';
    } else {
      setIsActive(true);
      document.body.style.overflow = 'hidden';
    }
  }

  const handleLinkClick = () => {
    setIsActive(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <nav
      className={classNames('navbar', 'is-white', {
        'is-open': isActive,
      })}
    >
      <div
        className={classNames('navbar-brand', {
          'is-open-container': isActive,
        })}
      >
        <Link to="/" className="logo-link">
          <img className="logo-icon" src={ Logo } alt="Logo" />
        </Link>

        <div
          className={classNames('navbar-burger', 'burger', {
            'is-active': isActive,
            })}
          data-target="navMenu"
          onClick={handleOpenMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        id="navMenu"
        className={classNames('navbar-menu', {
          'is-open-menu': isActive,
        })}
      >
        <div
          className={classNames('navbar-end', {
            'navbar-is-open': isActive,
          })}
        >
          <Link to="gallery" className="navlink" onClick={handleLinkClick}>Gallery</Link>
          <Link to="/authors" className="navlink" onClick={handleLinkClick}>Authors</Link>
          <a href="https://u24.gov.ua/" target="blank" className="navlink" onClick={handleLinkClick}>United24</a>
          <Link to="about" className="navlink" onClick={handleLinkClick}>About</Link>
          <button className="button is-light button-auth">Log in</button>
          <button className="button is-dark button-auth">Sign up</button>
        </div>
      </div>
    </nav>
  );
}
