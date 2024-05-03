import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import LocaleContext from '../contexts/LocaleContext';

function PlaylistButton({ duration, img, url, text, length }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const { themeContextValue, localeContextValue } = React.useContext(LocaleContext);
  const { theme } = themeContextValue;
  const { locale } = localeContextValue;

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, parseInt(duration));
  }, [isLoading]);

  return (
    <div className='playlist'>
      {
        isLoading
          ? <div className='animate-fading__playlist skeleton__playlist-img'></div>
          : <img
              className='animate-fading__playlist'
              // src='./images/skeleton/placeholder.webp'
              src={`${theme === 'light' ? `${img}.webp` : `${img}-dark.webp`}`}
              alt='' />
      }
      <Link to={url} className='playlist__link'>
        <div className='playlist__box-title'>
          <p className='playlist__title'>{text}</p>
          <p>{length} {locale === 'id' ? 'lagu' : 'songs'}</p>
        </div>
        <div className='playlist__icon'>
          <MdArrowForwardIos />
        </div>
      </Link>
    </div>
  )
}

export default PlaylistButton;
