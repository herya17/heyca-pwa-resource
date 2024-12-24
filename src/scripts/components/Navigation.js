import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdSort,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdTranslate,
  MdOutlineGTranslate,
  MdOutlineLogout,
  MdFavoriteBorder,
  MdPersonAddAlt1,
  MdSend,
  MdOutlineShoppingCart,
  MdOutlineChat,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { TbHome } from 'react-icons/tb';
import Drawer from 'react-modern-drawer';
import LocaleContext from '../contexts/LocaleContext';
import Swal from 'sweetalert2';

function Navigation({ logout }) {
  const path = window.location.pathname;
  const navigate = useNavigate();
  const [ isOpen, setIsOpen ] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale, toggleLocale } = localeContextValue;
  const { theme, toggleTheme } = themeContextValue;

  const notifications = () => {
    navigate(`/notification`);
  }
  

  return (
    <div className='note-app__nav'>
      <p className='notes-app__title'>HeyCa!!</p>
      <nav>
        <div className='notes-app__nav-left'>
          {/* {
            path === '/'
              ? <Link aria-label='Add to favorite page' className='' to='/archived'><MdFavoriteBorder /></Link>
              : <Link aria-label='Add to home page' className='' to='/'><TbHome /></Link>
          } */}
          <button onClick={toggleDrawer}><MdSort /></button>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='left'
            size={280}
            duration={300}
            zIndex={100}
            lockBackgroundScroll={true}
            className='drawer'>
              <div className="sidenav">
                <ul id="slide-out">
                  <li>
                    <div className="user-view">
                      <Link to=""><img className="circle" src=".images/icon-music/21.webp" /></Link>
                      <Link to=""><span className="white-text name">???</span></Link>
                      <Link to=""><span className="white-text email">???@gmail.com</span></Link>
                    </div>
                  </li>
                  <hr />
                  <li><Link to="/"><TbHome /><span> Home</span></Link></li>
                  <li><Link to="/archived"><MdFavoriteBorder /><span> Archived</span></Link></li>
                  <li>
                    <button aria-label='Add to change language' onClick={toggleLocale}>
                      {locale === 'id' ? <MdTranslate /> : <MdOutlineGTranslate />}<span> Translate</span>
                    </button>
                  </li>
                  <li>
                    <button aria-label='Add to dark mode' onClick={toggleTheme}>
                      {theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}<span> Story Mode</span>
                    </button>
                  </li>
                  <li>
                    <button aria-label='Add to logout' onClick={logout}><MdOutlineLogout /><span> Logout</span></button>
                  </li>
                  <li><a className="subheader">Help & feedback</a></li>
                  <li><Link to="#"><MdPersonAddAlt1 /><span> Contact</span></Link></li>
                  <li><Link to="#"><MdSend /><span> Send feedback</span></Link></li>
                </ul>
              </div>
          </Drawer>
        </div>
        <div className='notes-app__nav-right'>
          {/* <button aria-label='Add to change language' onClick={toggleLocale}>
            {locale === 'id' ? <MdTranslate /> : <MdOutlineGTranslate />}
          </button>
          <button aria-label='Add to dark mode' onClick={toggleTheme}>
            {theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </button>
          <button aria-label='Add to logout' onClick={logout}>
            <MdOutlineLogout />
          </button> */}
          <button aria-label='Add to change language' onClick={() => console.log('shop')}>
            <MdOutlineShoppingCart />
          </button>
          <button aria-label='Add to dark mode' onClick={() => console.log('chat')}>
            <MdOutlineChat />
          </button>
          <button aria-label='Add to logout' onClick={notifications}>
            <MdOutlineNotificationsActive />
          </button>
        </div>
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default Navigation;
