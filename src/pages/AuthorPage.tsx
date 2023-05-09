import { useEffect, useState } from 'react';
import { AuthorInfo } from '../components/AuthorInfo';
import { MyPaintings } from './MyPaintings';
import { Author } from '../types/painting';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GETAUTHOR = 'https://www.albedosunrise.com/authors/';


export const AuthorPage = () => {
  const [author, setAuthor] = useState<Author | null>(null)
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
          <MyPaintings
            author={author}
            isAuthor={false}
          />
        </>
      )}
    </section>
  );
};
