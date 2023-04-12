import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="section about">
      <div className="container about-items">
        <div className="title">Art vs War</div>

        <div className="text description">
          Our project dedicated to supporting Ukrainian artists 
          and creatives who have been displaced abroad due to the war in Ukraine. 
          We offer a unique opportunity to purchase their artwork while contributing to a good cause. 
          <br/>
          <br/>
          Each painting tells a story of Ukraine's struggle for freedom and independence. 
          By purchasing a painting, you support the artist and contribute to the victory of Ukraine and democracy. 
          Browse our collection and find a painting that speaks to you. Thank you for your support.
        </div>
        
        <button
          className="button-get-all"
        >
          Learn More
        </button>
      </div>
    </section>
  );
};
