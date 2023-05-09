import React from 'react';
import { Author } from '../types/painting';
import { AuthorCard } from './AuthorCard';

type Props = {
  authors: Author[];
}

export const AuthorList: React.FC<Props> = ({ authors }) => {
  return (
    <div className="authors-list">
      {authors.map(author => (
          <AuthorCard
            key={author.id}
            author={author}
          />
      ))}
    </div>
  );
};