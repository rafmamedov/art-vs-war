import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/scss';
import "swiper/scss/navigation";
import { Painting } from '../types/painting';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PaintingCard } from './PaintingCard';
import axios from 'axios';

const URL = 'https://www.albedosunrise.com/paintings?page=0&pageSize=12';

export const Carousel: React.FC = () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const getAllPaintingsFromServer = async () => {
    axios.get(URL)
      .then((response) => {
        setPaintings(response.data.entities);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 300);
      })
  };

  useEffect(() => {
    getAllPaintingsFromServer();
  }, []);

  const breakpoints = {
    1024: {
      slidesPerView: 3,
    },

    680: {
      slidesPerView: 2,
    },
  }

  return (
    <>
      <section
        id="gallery"
        className="section collection"
      >
        {isFetching && <Loader />}

        {(!isFetching && paintings.length === 1) && (
          <div className="carousel-two-cards">
            <PaintingCard painting={paintings[0]} />
          </div>
        )}

        {(!isFetching && paintings.length === 2) && (
          <div className="carousel-two-cards">
            <PaintingCard painting={paintings[0]} />
            <PaintingCard painting={paintings[1]} />
          </div>
        )}

        {(!isFetching && paintings.length === 3) && (
          <div className="carousel-two-cards">
            <PaintingCard painting={paintings[0]} />
            <PaintingCard painting={paintings[1]} />
            <PaintingCard painting={paintings[2]} />
          </div>
        )}

        {(!isFetching && paintings.length > 3) && (
          <Swiper
            modules={[Navigation]}
            navigation={true}
            slidesPerView={1}
            breakpoints={breakpoints}
          >
            {paintings.map(painting => (
              <SwiperSlide key={painting.id}>
                <div className="card collection-card swiper-card">
                  <Link className="card-link" to={`/gallery/${painting.id}`}>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          className="painting-image"
                          src={painting.imageUrl}
                          alt="painting"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="subtitle is-6"><strong>{painting.style.name}</strong>
                            <br/>{painting.medium.name}, {painting.support.name}
                            <br/>{painting.width} x {painting.height} cm
                          </p>
                          <p className="collection-card-title">{painting.title}</p>
                          <p className="collection-card-subtitle">{painting.author.fullName}</p>
                          <p className="subtitle is-4">€ {painting.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {paintings.length && (
        <section className="section collection">
          <Link
            to="/gallery"
            className="button button-get-all button-collection"
          >
            View All
          </Link>
        </section>
      )}
    </>
  );
};
