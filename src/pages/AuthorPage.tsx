import React from 'react';
import { Carousel } from '../components/Carousel';

export const AuthorPage = () => {
  return (
    <section className="section author">
      <div className="container author-card">
        <div className="author-image"></div>

        <form className="author-info">
          <div className="author-title-container">
            <div className="author-title">Authors Name</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">Country</div>
          </div>

          <div className="author-title-container">
          <div className="author-title">Town</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">Preferred Styles</div>
          </div>

          <div className="author-title-container author-title-container-last">
            <div className="author-title">Preferred materials</div>
          </div>

          <div className="author-description">
            <span><strong>About me:</strong></span> As I set out to create this painting, my goal was to capture the essence of Ukraine's 
            rich cultural heritage and its close relationship with nature. I wanted to represent 
            the country's agricultural roots and its strong sense of national pride, all within a single image.
          </div>

          <button className="button-get-all">
            Buy
          </button>
        </form>
      </div>

      <div className="container my-works">
        <div className="author-title">My works (number)</div>
        {/* <Carousel paintings={paintings} /> */}
      </div>
    </section>
  );
};
