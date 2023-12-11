import Carousel from 'react-bootstrap/Carousel';

function PhotoCarousel() {
  return (
    <>
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item c-item active">
            <img src="/dogs1.jpg" class="d-block w-100 c-img" alt="Slide 1" />
            <div class="carousel-caption mt-4 position-absolute translate-middle-y top-50">
              <h5 class="display-1 fw-bold text-capitalize mt-5">
                Let's Get it Pawpen'
              </h5>
              <p class="fs-5 text-uppercase mt-4">
                Discover what all the howlin' is about
              </p>
              <button class="btn btn-primary px-4 py-2 fs-5 mt-5">
                Take a woof inside
              </button>
            </div>
          </div>
          <div class="carousel-item c-item">
            <img src="/dogs2.jpg" class="d-block w-100 c-img" alt="Slide 2" />
          </div>
          <div class="carousel-item c-item">
            <img src="/dogs3.jpg" class="d-block w-100 c-img" alt="Slide 3" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default PhotoCarousel;
