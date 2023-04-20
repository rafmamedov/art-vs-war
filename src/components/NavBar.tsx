import React, { SetStateAction, useState } from 'react';
import Logo from '../images/LOGO.svg'
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

type Props ={
  onAuthenticating: React.Dispatch<SetStateAction<boolean>>;
};

export const NavBar: React.FC<Props> = ({ onAuthenticating }) => {
  const [isActive, setIsActive] = useState(false);
  const {
    route,
    signOut,
    toSignUp,
    toSignIn,
  } = useAuthenticator((context) => [context.route]);
  const isAuthentificated = route === 'authenticated';

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
    onAuthenticating(false);
  };

  const handleAuthenticate = (signUp: boolean) => {
    onAuthenticating(true);
    signUp ? toSignUp() : toSignIn();
  }

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
        <Link to="/" className="logo-link" onClick={() => onAuthenticating(false)}>
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

          {isAuthentificated
            ? (
              <>
                <Link
                  to="/profile"
                  className="button button-auth"
                >
                  My profile
                </Link>

                <Link
                  to="/"
                  onClick={signOut}
                  className="button is-dark button-auth"
                >
                  Sign out
                </Link>
              </>
            )
            : (
              <>
                <button onClick={() => handleAuthenticate(false)} className="button is-light button-auth">Sign in</button>
                <button onClick={() => handleAuthenticate(true)} className="button is-dark button-auth">Sign up</button>
              </>
            )}
        </div>
      </div>
    </nav>
  );
}
