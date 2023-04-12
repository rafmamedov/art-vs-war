import React from 'react';
import '../styles.scss'
import 'bulma/css/bulma.css';
import { Header } from '../components/Header';
import { AboutUs } from '../components/AboutUs';
import { Carousel } from '../components/Carousel';
import { Fund } from '../components/Fund';
import { JoinUs } from '../components/JoinUs';
import { Results } from '../components/Results';

export const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <AboutUs />
      <Carousel />
      <Fund />
      <Results />
      <JoinUs />
    </>
  );
}
