import React, { SetStateAction } from 'react';
import '../styles/styles.scss'
import 'bulma/css/bulma.css';
import { Header } from '../components/Header';
import { AboutUs } from '../components/AboutUs';
import { Carousel } from '../components/Carousel';
import { Fund } from '../components/Fund';
import { JoinUs } from '../components/JoinUs';
import { Results } from '../components/Results';
import { useAuthenticator } from '@aws-amplify/ui-react';

type Props ={
  onAuthenticating: React.Dispatch<SetStateAction<boolean>>;
};

export const MainPage: React.FC<Props> = ({ onAuthenticating }) => {
  const { route } = useAuthenticator((context) => [context.route]);

  return (
    <>
      <Header />
      <AboutUs />
      <Carousel />
      <Fund />
      <Results />
      {route !== 'authenticated' && (
        <JoinUs onAuthenticating={onAuthenticating} />
      )}
    </>
  );
};
