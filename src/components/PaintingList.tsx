import React from 'react';
import { PaintingCard } from './PaintingCard';
import { Painting } from '../types/painting';
import '../styles/styles.scss';

type Props = {
  paintings: Painting[];
};

export const PaintingList: React.FC<Props> = ({ paintings }) => {
  return (
    <section id="gallery" className="section collection">
      <div className="collection-list">
        {paintings.map(painting => (
            <PaintingCard
              key={painting.id}
              painting={painting}
            />
        ))}
      </div>
    </section>
  );
};
