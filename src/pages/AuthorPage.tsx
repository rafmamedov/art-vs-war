import React, { useEffect, useState } from 'react';
import { AuthorInfo } from '../components/AuthorInfo';
import { MyPaintings } from './MyPaintings';
import axios from 'axios';
import { Author, Painting } from '../types/painting';
import { useLocation } from 'react-router-dom';

const GETAUTHOR = 'https://www.albedosunrise.com/authors/';
const URL = 'http://www.albedosunrise.com/paintings/by-author?authorId='

export const AuthorPage = () => {
  const [author, setAuthor] = useState<Author | null>(null)
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [isFetching, setIsFetching] = useState(true);
  const location = useLocation();

  const getAuthorById = async () => {
    await axios.get(GETAUTHOR + location.pathname.split('/')[1])
      .then((response) => {
        setAuthor(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const getPaintingsFromServer = async () => {
    await axios.get(URL + author?.id )
    .then((response) => {
      setPaintings(response.data.paintings);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300);
      })
  };

  useEffect(() => {
    getPaintingsFromServer();
  }, []);

  useEffect(() => {
    getAuthorById();
  }, [])

  return (
    <section className="section profile">
      {author && (
        <>
          <AuthorInfo
            author={author}
          />
          <MyPaintings author={author} />
        </>
      )}
    </section>
  );
};
