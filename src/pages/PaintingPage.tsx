import React, { useEffect, useState } from 'react';
import '../styles/styles.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Painting } from '../types/painting';
import { Loader } from '../components/Loader';
import axios from 'axios';

const element = <FontAwesomeIcon className="icon-cross" icon={faXmark} size="xl" />;
const URL = 'https://www.albedosunrise.com/paintings/';

export const PaintingPage: React.FC = () => {
  const [painting, setPainting] = useState<Painting | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const { paintingId = '' } = useParams();

  const getPaintingById = async () => {
    await axios.get(URL + paintingId)
      .then((response) => {
        setPainting(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300)
      })
  };

  useEffect(() => {
    getPaintingById();
  }, [paintingId]);

  return (
    isFetching
      ? <Loader />
      : (
        <section className="section painting">
          <div className="icon-container">
            <span onClick={() => navigate(-1)}>{element}</span>
          </div>

          <div className="painting-card">
            <img
              src={painting?.imageUrl}
              className="painting-image"
              alt="painting"
            />

            <div className="painting-info">
              <div className="painting-title-container">
                <div className="painting-title">Title:</div>
                <div className="painting-title"><strong>{painting?.title}</strong></div>
              </div>

              <div className="painting-title-container">
                <div className="painting-title">Author:</div>
                <div className="painting-title">
                    <Link
                      to={`/${painting?.author.id}`}
                    >
                        {painting?.author.fullName}
                    </Link>
                </div>
              </div>

              <div className="painting-title-container">
              <div className="painting-title">Year:</div>
              <div className="painting-title">{painting?.yearOfCreation}</div>
              </div>

              <div className="painting-title-container">
                <div className="painting-title">Style:</div>
                <div className="painting-title">{painting?.style.name}</div>
              </div>

              <div className="painting-title-container">
                <div className="painting-title">Medium:</div>
                <div className="painting-title">{painting?.medium.name}</div>
              </div>

              <div className="painting-title-container">
                <div className="painting-title">Support:</div>
                <div className="painting-title">{painting?.support.name}</div>
              </div>

              <div className="painting-title-container">
                <div className="painting-title">Height x Width:</div>
                <div className="painting-title">{painting?.height} x {painting?.width} cm</div>
              </div>

              <div className="painting-title-container">
                <div className="painting-title">Price:</div>
                <div className="painting-title"><strong>€{painting?.price}</strong></div>
              </div>

              <div className="painting-title-container painting-title-container-last">
                <div className="painting-title">Date of adding to database:</div>
                <div className="painting-title">{painting?.entityCreatedAt}</div>
              </div>

              <div className="painting-description">
                <span><strong>Description: </strong></span>
                {painting?.description}
              </div>

              <button className="button-get-all">
                Buy
              </button>
            </div>
          </div>
        </section>
  ));
};
