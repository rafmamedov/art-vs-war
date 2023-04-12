import React from 'react';
import { Painting } from '../types/painting';
import { PaintingList } from '../components/PaintingList';

type Props = {
  paintings: Painting[];
};

export const Gallery: React.FC<Props> = ({ paintings }) => {
  return (
    <PaintingList paintings={paintings} />
  );
};
