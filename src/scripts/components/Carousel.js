import React from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ listImage }) => {
  const [ images, setImages ] = React.useState(listImage);
  const [ index, setIndex ] = React.useState(0);
  const timeoutRef = React.useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  
  React.useEffect(() => {
    if (images.length) {
      timeoutRef.current = setTimeout(() => {
        setIndex((index + 1) % images.length)
      }, 9000);
    }

    return () => {
      resetTimeout();
    }
  }, [index])

  return (
    <img
      src={images[index]}
      className='hero-img animate-fading lazyload'
      alt='Slideshow of memories' />
  );
}

Carousel.propTypes = {
  listImage: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Carousel;

{/* <img class="heros__detail lazyload"
          src="./images/skeleton/placeholder.png"
          data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM}/${this._restaurant.pictureId}"
          data-srcset="${CONFIG.BASE_IMAGE_URL}/${this._restaurant.pictureId} 480w, ${CONFIG.BASE_IMAGE_URL_MEDIUM}/${this._restaurant.pictureId} 920w"
          data-sizes="(max-width: 600px) 480px, 920px"
          alt="${this._restaurant.name}" /> */}
