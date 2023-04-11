import React from 'react';

export const Author = () => {
  return (
    <section className="section author">
      <div className="container author-card">
        <div className="author-image"></div>

        <form className="author-info">
          <div className="author-title-container">
            <div className="author-title">first Name:</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">last Name:</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">login:</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">password:</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">phone number:</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">country:</div>
          </div>

          <div className="author-title-container">
          <div className="author-title">town:</div>
          </div>

          <div className="author-title-container">
            <div className="author-title">preferred styles:</div>
          </div>

          <div className="author-title-container author-title-container-last">
            <div className="author-title">preferred materials:</div>
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
    </section>
  );
};
