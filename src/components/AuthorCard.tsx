import React, { useEffect, useState } from 'react';
import { Author, Painting } from '../types/painting';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Props = {
  author: Author;
};

const GETALLPAINTINGS = 'https://www.albedosunrise.com/paintings/by-author/'
const locationIcon = <FontAwesomeIcon className="far" icon={faLocationDot} />;

export const AuthorCard: React.FC<Props> = ({ author }) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const styles = paintings.map(painting => painting.style.name);
  
  const removeDublicates = (array: string[]) => {
    const result: string[] = [];

    array.forEach(item => {
      if (!result.includes(item)) {
        result.push(item);
      }
    });

    return result.join(', ');
  }

  const getAllPaintingsByAuthor = async () => {
    axios.get(GETALLPAINTINGS + author.id)
      .then(response => {
        setPaintings(response.data.paintings);
      })
      .catch(error => console.log(error))
  };

  useEffect(() => {
    getAllPaintingsByAuthor();
  }, [])


  return (
    <div className="card authors-card">
      <Link to={`/${author.id}`} className="authors-link">
        <div className="card-image">
          <figure className="image is-4by3 authors-card-image">
            {author.photoUrl ? (
              <img src={author.photoUrl} alt="placeholder" />
              ) : (
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="placeholder" />
              )}
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4 authors-title">{author.fullName}</p>
              <p className="subtitle is-6">{locationIcon} {author.country}, {author.city}</p>
            </div>
          </div>

          <div className="content">
            {styles.length > 0 ? (
              <>
                <strong>Styles:</strong> {removeDublicates(styles)}
              </>
            ) : (
              <>
                <strong>Paintings in base:</strong> {paintings.length}
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};