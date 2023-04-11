import React from 'react';
import '../styles.scss'
import 'bulma/css/bulma.css';
import { Header } from '../components/Header';
import { AboutUs } from '../components/AboutUs';
import { Carousel } from '../components/Carousel';
import { Fund } from '../components/Fund';
import { JoinUs } from '../components/JoinUs';
import { Results } from '../components/Results';

type Props = {
  getAll: () => void;
};

export const MainPage: React.FC<Props>= ({ getAll }) => {
  return (
    <>
      <Header getAll={getAll} />
      <AboutUs getAll={getAll} />
      <Carousel />
      <Fund getAll={getAll} />
      <Results />
      <JoinUs />
    </>
  );
}
