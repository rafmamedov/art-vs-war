import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon className="icon-cross" icon={faXmark} size="xl" />;

export const Painting: React.FC = () => (
  <section className="section painting">
    <div className="icon-container">{element}</div>

    <div className="container painting-card">
      <div className="painting-image"></div>

      <div className="painting-info">
        <div className="painting-title-container">
          <div className="painting-title"></div>
          <div className="painting-title"></div>
        </div>

        <div className="painting-title-container">
          <div className="painting-title"><strong>Title:</strong></div>
          <div className="painting-title"><strong>Flag of Bravery</strong></div>
        </div>

        <div className="painting-title-container">
          <div className="painting-title">Author:</div>
          <div className="painting-title">Marina Leganowska</div>
        </div>

        <div className="painting-title-container">
          <div className="painting-title">Year:</div>
          <div className="painting-title">2022</div>
        </div>

        <div className="painting-title-container">
          <div className="painting-title">Style:</div>
          <div className="painting-title">Expressionism</div>
        </div>

        <div className="painting-title-container">
          <div className="painting-title">Medium:</div>
          <div className="painting-title">Oil</div>
        </div>

        <div className="painting-title-container">
          <div className="painting-title">Support:</div>
          <div className="painting-title">Canvas</div>
        </div>

        <div className="painting-title-container">
          <div className="painting-title">Height x Width (cm):</div>
          <div className="painting-title">70 x 50</div>
        </div>

        <div className="painting-title-container painting-title-container-last">
          <div className="painting-title">Cost:</div>
          <div className="painting-title">$25</div>
        </div>

        <div className="painting-description">
          As I set out to create this painting, my goal was to capture the essence of Ukraine's 
          rich cultural heritage and its close relationship with nature. I wanted to represent 
          the country's agricultural roots and its strong sense of national pride, all within a single image.
        </div>

        <button className="button-get-all">
          Buy
        </button>
      </div>
    </div>
  </section>
);
