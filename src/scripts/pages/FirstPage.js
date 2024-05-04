import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdTranslate,
  MdOutlineGTranslate,
  MdOutlineDarkMode,
  MdOutlineLightMode
} from 'react-icons/md';
import listHero from '../data/list-hero';
import Carousel from '../components/Carousel';
import OstPlayer from '../components/OstPlayer';
import LocaleContext from '../contexts/LocaleContext';

function FirstPage() {
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale, toggleLocale } = localeContextValue;
  const { theme, toggleTheme } = themeContextValue;

  return (
    <>
      <header>
        <Carousel listImage={listHero} />
        <p className='notes-app__title bold'>HeyCa!! Special 17th</p>
      </header>
      <main id='mainContent'>
        <div className='first-page'>
          <p>
            {
              locale === 'id'
                ? 'Sesingkat apapun ceritanya tetaplah bermakna meski cerita itu sendiri menyakitkan'
                : 'No matter how short the story is, it is still meaningful even though the story itself is painful'
            }
          </p>
          <div className='action-button__first-page'>
            <Link className='register' to='/register'>{locale === 'id' ? 'Daftar' : 'Register'}</Link>
            <Link className='login' to='/login'>{locale === 'id' ? 'Masuk' : 'Login'}</Link>
          </div>
          <div className='heart-msg'>
            <p>{locale === 'id' ? `~~~~~~~~~~"Dibuat dengan sepenuh hati"~~~~~~~~~~` : `~~~~~~~~~~"Made with all my heart"~~~~~~~~~~`}</p>
          </div>
          <div className="play-music">
            <OstPlayer />
          </div>
          <div className='translate-btn__first-page'>
            <button aria-label='Add to change language' onClick={toggleLocale}>
              {locale === 'id' ? <MdTranslate /> : <MdOutlineGTranslate />}
            </button>
            <button aria-label='Add to dark mode' onClick={toggleTheme}>
              {theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default FirstPage;
