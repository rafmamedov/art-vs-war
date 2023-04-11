import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/scss';
import "swiper/scss/navigation";
import { Painting } from '../types/painting';
import { PaintingCard } from './PaintingCard';
import { Link } from 'react-router-dom';

type Props = {
  paintings: Painting[];
};

export const Carousel: React.FC<Props> = ({ paintings }) => {
  const breakpoints = {
    1024: {
      slidesPerView: 3,
    },

    680: {
      slidesPerView: 2,
    },
  }

  return (
    <section
      id="gallery"
      className="section collection"
    >
        <Swiper
          modules={[Navigation]}
          navigation={true}
          slidesPerView={1}
          breakpoints={breakpoints}
        >
          {paintings.map(painting => (
            <SwiperSlide>
              <Link to={`/painting`}>
                <div className="card collection-card swiper-card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        className="painting-image"
                        src={painting.imageUrl}
                        alt="Painting image"
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
                        <p className="collection-card-title">{painting.title.slice(0, -2)}</p>
                        <p className="collection-card-subtitle">{painting.author.name}</p>
                        <p className="subtitle is-4">€ {painting.price}</p>
                      </div>
                    </div>
                    <div className="content">
                      {painting.description}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  );
};
