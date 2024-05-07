import React from 'react';
import PropTypes from 'prop-types';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import FavoriteSongIdb from '../data/favorite-song-idb';
import WavesLoader from '../components/WavesLoader';
import WavesLoaderStatic from '../components/WavesLoaderStatic';
import LocaleContext from '../contexts/LocaleContext';
import Toastify from 'toastify-js';

function MusicPlayerCatalog({ song }) {
  const {
    localeContextValue,
    themeContextValue,
    isPlayingContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const { theme } = themeContextValue;
  const { isPlaying } = isPlayingContextValue;
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ isFavorite, setIsFavorite ] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  React.useEffect(() => {
    const isSongExist = async (id) => {
      const isSongExist = await FavoriteSongIdb.getSong(id);
      if (isSongExist) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }

    isSongExist(song.id);
  }, [song]);

  const btnFavoriteListener = async (song) => {
    await FavoriteSongIdb.putSong({ 
      ...song,
      id: song.id,
    });
    setIsFavorite(true);
    Toastify({
      text: `${locale === 'id' ? 'Favorit ditambah' : 'Favorite added'}`,
      duration: 2000,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: `${theme === 'light' ? 'linear-gradient(to right, #c2afe9, #bea8e7)' : '#2f3032'}`,
        borderRadius: '21px',
        padding: '15px 12px 18px 18px',
        fontSize: '17px',
        marginBottom: '20px',
      }
    }).showToast();
  }

  const btnUnfavoriteListener = async (id) => {
    await FavoriteSongIdb.deleteSong(id);
    setIsFavorite(false);
    Toastify({
      text: `${locale === 'id' ? 'Favorit dihapus' : 'Favorite deleted'}`,
      duration: 2000,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: `${theme === 'light' ? 'linear-gradient(to right, #c2afe9, #bea8e7)' : '#2f3032'}`,
        borderRadius: '21px',
        padding: '15px 12px 18px 18px',
        fontSize: '17px',
        marginBottom: '20px',
      }
    }).showToast();
  }

  return (
    <div className='playlist music-player-catalog'>
      {
        isLoading
          ? <div className='skeleton__playlist-img'></div>
          : <img
              src={song.img}
              className='animate-fading__playlist lazyload'
              alt='' />
      }
      {
        isPlaying ? <WavesLoader /> : <WavesLoaderStatic />
      }
      <div className='music-player-catalog__body'>
        <div className='playlist__box-title'>
          <p className='playlist__title'>{song.title}</p>
          <p>{song.singer}</p>
        </div>
        {
          isFavorite
            ? (<button onClick={() => btnUnfavoriteListener(song.id)} className='like-btn'>
                <MdFavorite className='music-player-catalog__icon unfavorite' />
              </button>)
            : (<button onClick={() => btnFavoriteListener(song)} className='like-btn'>
                <MdFavoriteBorder className='music-player-catalog__icon' />
              </button>)
        }
      </div>
    </div>
  )
}

MusicPlayerCatalog.propTypes = {
  song: PropTypes.object.isRequired,
}

export default MusicPlayerCatalog;
