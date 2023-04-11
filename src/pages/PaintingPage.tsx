import React, { useCallback, useEffect, useState } from 'react';
import '../styles.scss';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Painting } from '../types/painting';

const element = <FontAwesomeIcon className="icon-cross" icon={faXmark} size="xl" />;
const URL = 'https://www.albedosunrise.com/paintings/';

export const PaintingPage: React.FC = () => {
  const [painting, setPainting] = useState<Painting | null>(null);
  const { paintingId = '' } = useParams();

  const getPaintingById = async () => {
    await axios.get(URL + paintingId)
      .then((response) => {
        setPainting(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    getPaintingById();
  }, [paintingId]);

  return (
    <section className="section painting">
      <div className="icon-container"><Link to="/gallery">{element}</Link></div>

      <div className="container painting-card">
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
            <div className="painting-title">{painting?.author.name}</div>
          </div>

          <div className="painting-title-container">
          <div className="painting-title">Year:</div>
          <div className="painting-title">{painting?.entityCreatedAt.split('.')[2]}</div>
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
            <div className="painting-title">Height x width:</div>
            <div className="painting-title">{painting?.height} x {painting?.width} cm</div>
          </div>

          <div className="painting-title-container">
            <div className="painting-title">Cost:</div>
            <div className="painting-title"><strong>${painting?.price}</strong></div>
          </div>

          <div className="painting-title-container painting-title-container-last">
            <div className="painting-title">Date of ading to database:</div>
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
  );
};
