import Carousel from 'react-bootstrap/Carousel';
import styles from './PhotoCarousel.module.css';

function PhotoCarousel() {
  return (
    <Carousel id={styles.photoCarousel}>
      <Carousel.Item>
        <img src="/dogs1.jpg" alt="" style={{ height: '500px' }} />
        <Carousel.Caption>
          <h1 className={`${styles.carouselCaption} fw-bold text-capitalize `}>
            Let's Get it Pawpen'
          </h1>
          <p className="fs-5 text-uppercase mt-4">
            Discover what all the howlin' is about
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/dogs2.jpg" alt="" style={{ height: '500px' }} />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/dogs3.jpg" alt="" style={{ height: '500px' }} />
      </Carousel.Item>
    </Carousel>
  );
}

export default PhotoCarousel;
