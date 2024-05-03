import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { MdOutlineDarkMode, MdOutlineLightMode, MdTranslate, MdOutlineGTranslate, MdOutlineLogout, MdFavoriteBorder, } from 'react-icons/md';
import { TbHome } from 'react-icons/tb';

function Navigation({ logout, name }) {
  const path = window.location.pathname;
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale, toggleLocale } = localeContextValue;
  const { theme, toggleTheme } = themeContextValue;

  return (
    <div className='note-app__nav'>
      <p className='notes-app__title'>HeyCa!!</p>
      <nav>
        <div className='notes-app__nav-left'>
        {
          path === '/'
          ? <Link aria-label='Add to favorite page' className='' to='/archived'><MdFavoriteBorder /></Link>
          : <Link aria-label='Add to home page' className='' to='/'><TbHome /></Link>
        }
        </div>
        <div className='notes-app__nav-right'>
          <button aria-label='Add to change language' onClick={toggleLocale}>{locale === 'id' ? <MdTranslate /> : <MdOutlineGTranslate />}</button>
          <button aria-label='Add to dark mode' onClick={toggleTheme}>{theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}</button>
          <button aria-label='Add to logout' onClick={logout}><MdOutlineLogout /></button>
        </div>
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
}

export default Navigation;
