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
      className='hero-img animate-fading lazyload'
      src={images[index]}
      alt='Slideshow of memories' />
  );
}

Carousel.propTypes = {
  listImage: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Carousel;
