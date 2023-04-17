import React from 'react';
import { AuthorInfo } from '../components/AuthorInfo';
import { MyPaintings } from './MyPaintings';

export const AuthorPage = () => {

  return (
    <section className="section profile">
      <AuthorInfo />
      <MyPaintings />
    </section>
  );
};
