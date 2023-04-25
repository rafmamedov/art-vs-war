import React, { SetStateAction } from 'react';
import '../styles.scss'
import 'bulma/css/bulma.css';
import { useAuthenticator } from '@aws-amplify/ui-react';

type Props ={
  onAuthenticating: React.Dispatch<SetStateAction<boolean>>;
};

export const JoinUs: React.FC<Props> = ({ onAuthenticating }) => {
  const { route, toSignUp } = useAuthenticator((context) => [context.route]);
  const isAuthentificated = route === 'authenticated';

  const handleAuthenticate = () => {
    if (!isAuthentificated) {
      onAuthenticating(true);
      toSignUp();
    }
  }

  return (
    <section id="authors" className="hero is-dark is-large join-us">
      <div className="join-us-items">
        <div className="join-us-item-1">
          <div className="subtitle is-3">
            Are you an artist? Join us!
          </div>

          <div className="subtitle is-4">
            Click the button and make the world better
          </div>

          <button
            className="button is-light button-collection button-get-all"
            onClick={handleAuthenticate}
          >
            Sign up
          </button>
        </div>

        <div className="join-us-item-2">
          <div className="join-us-img-1"></div>
          <div className="join-us-img-2"></div>
        </div>
      </div>
    </section>
  );
};
