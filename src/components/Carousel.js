import React from 'react';

const Carousel = ({ listImage }) => {
  const [images, setImages] = React.useState(listImage);
  const [index, setIndex] = React.useState(0);
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

export default Carousel;
