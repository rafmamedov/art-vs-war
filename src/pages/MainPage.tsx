import React from 'react';
import { Painting } from '../types/painting';
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
  paintings: Painting[];
};

export const MainPage: React.FC<Props>= ({ getAll, paintings }) => {
  return (
    <>
      <Header getAll={getAll} />
      <AboutUs getAll={getAll} />
      <Carousel paintings={paintings} />
      <Fund getAll={getAll} />
      <Results />
      <JoinUs />
    </>
  );
}
