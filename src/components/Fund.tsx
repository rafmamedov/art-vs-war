import React from 'react';

export const Fund: React.FC = () => {
  return (
    <section id="united24" className="section fund">
      <div className="fund-content">
        <div className="fund-ambassadors">
          <div className="fund-image"></div>

          <div className="text fund-text">
            Mark Hamill, the actor who portrayed Luke Skywalker 
            in the Star Wars movie saga and ambassador of UNITED24, calls on you to support Ukraine.
            <br/>
            <br/>
            Join the fundraiser for 10 RQ-35 Heidrun scout drones!
            25 of these Danish-made UAVs were sent to the front line in the spring.
          </div>
        </div>

        <div className="container fund-united24">
          <div className="title fund-title">
            UNITED 24 FUND
          </div>

          <div className="text">
            All funds raised through our website will be sent to the United 24 Fund, 
            which aims to unite the world around supporting Ukraine in its efforts to protect, 
            save, and rebuild the country. The platform enables one-click donations to Ukraine from anywhere, 
            ensuring that aid is delivered directly to those who need it most.
            <br/>
            <br/>
            This is particularly important because charitable foundations, 
            no matter how well-organized, cannot meet the needs of a country 
            as large as Ukraine during a full-scale war. By working together, 
            we can provide more efficient and effective support to those affected by the conflict.
            <br/>
            <br/>
            UNITED24 collaborates with charities, partners, donors, and public figures worldwide 
            to establish an efficient work process that brings Ukraine closer to victory. 
            Through our website, you can contribute to this effort by purchasing paintings 
            or making a donation. Join us in supporting Ukraine and making a positive impact 
            on the lives of those affected by the war.
          </div>

          <a href="https://u24.gov.ua/" target="blank">
            <button
              className="button-get-all"
            >
                Learn More
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
