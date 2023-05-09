import '../styles/styles.scss';
import github from '../images/github.png';
import linkedin from '../images/LI-In.png';
import rafael from '../images/rafael.png';
import serhiy from '../images/serhiy.png';
import roman from '../images/roman.jpg';
import iryna from '../images/iryna qa.jpg';
import Flag_of_bravery from '../images/Flag_of_bravery.jpg';
import colours from '../images/colours.png';

import { Results } from '../components/Results';

export const About = () => (
  <div className="section about-us">
    <div className="about-container">
      <div className="content">
        <h1 className="about-title title is-1">Meet Art vs War project</h1>
        <h2 className="subtitle is-3 about-title about-subtitle">
          Our project supports Ukraine in ongoing war by showcasing
          the work of Ukrainian artist abroad and providing fundraising and donations for UA army.
        </h2>
        <div className="about-content-block">
          <img className="about-image" src={Flag_of_bravery} alt="Ukraine"/>

          <div className="about-text">
          <p>
            Our mission at Art vs War is to create a platform where displaced artists can showcase
            their work and receive support for their talents. The ongoing conflict in Ukraine has created
            a challenging environment for many artists, and we are proud to provide a platform that allows them
            to share their work with the world.
          </p>
          <p>
            The paintings available on our site are not only beautiful works of art,
            but they also tell a story. Each piece reflects the unique experiences and perspectives
            of the artist, and purchasing one of these paintings is a way to own a piece of history
            while contributing to a good cause.
          </p>
          </div>
        </div>

        <div className="about-content-block">
          <div className="about-text">
            <p>
              We believe that art has the power to bring people together, and our site is a place where
              individuals from all over the world can come together to support a common cause. By purchasing
              a painting or making a donation, you can be a part of this community and make a difference in the lives
              of those affected by the conflict in Ukraine.
            </p>
            <p>
              We provide regular updates on the funds generated from painting sales and donations. 
              We believe that it is important for our supporters to know exactly where their money 
              is going and the impact that it is having.
            </p>
          </div>

          <img className="about-image" src={colours} alt="clours"/>
        </div>

        <div className="team">
          <p className="title is-2 team-main-title">
            Our Team
          </p>

          <div className="team-list">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3 team-image">
                  <img src={serhiy} alt="placeholder" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 team-title">Sergii Bezrukov</p>
                    <p className="subtitle is-6 team-subtitle">Product Manager</p>
                  </div>
                </div>

                <div className="content">
                  <p className="subtitle is-6 team-content">Backend Java Developer</p>
                  <div className="social">
                    <a href="https://github.com/finedefinition" target="_blank" rel="noreferrer">
                      <img src={github} alt="github" className="social-logo" />
                    </a>
                    <a href="https://www.linkedin.com/in/sergiibezrukov/" target="_blank" rel="noreferrer">
                      <img src={linkedin} alt="linkedin" className="social-logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3 team-image">
                  <img src={roman} alt="placeholder" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 team-title">Roman Novosad</p>
                    <p className="subtitle is-6 team-subtitle">Team Lead</p>
                  </div>
                </div>

                <div className="content">
                  <p className="subtitle is-6 team-content">Backend Java Developer</p>
                  <div className="social">
                    <a href="https://github.com/romanovosad87" target="_blank" rel="noreferrer">
                      <img src={github} alt="github" className="social-logo" />
                    </a>
                    <img src={linkedin} alt="linkedin" className="social-logo" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3 team-image">
                  <img src={iryna} alt="placeholder" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 team-title">Iryna Maslyuk</p>
                    <p className="subtitle is-6 team-subtitle">Scrum Master</p>
                  </div>
                </div>

                <div className="content">
                  <p className="subtitle is-6 team-content">QA Engineer</p>
                  <div className="social">
                    <a href="https://github.com/IrinaMaslyuk" target="_blank" rel="noreferrer">
                      <img src={github} alt="github" className="social-logo" />
                    </a>
                    <a href="https://www.linkedin.com/in/iryna-masliuk-b98573236/" target="_blank" rel="noreferrer">
                      <img src={linkedin} alt="linkedin" className="social-logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3 team-image">
                  <img src={rafael} alt="placeholder" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 team-title">Rafael Mamedov</p>
                    <p className="subtitle is-6 team-subtitle">Demo Presenter</p>
                  </div>
                </div>

                <div className="content">
                  <p className="subtitle is-6 team-content">Frontend Developer</p>
                  <div className="social">
                    <a href="https://github.com/rafmamedov/" target="_blank" rel="noreferrer">
                      <img src={github} alt="github" className="social-logo" />
                    </a>
                    <a href="https://www.linkedin.com/in/rafael-mamedov-598a82a7/" target="_blank" rel="noreferrer">
                      <img src={linkedin} alt="linkedin" className="social-logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Results />
      </div>
    </div>
  </div>
);
