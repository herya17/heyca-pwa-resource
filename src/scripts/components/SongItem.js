import React from 'react';
import PropTypes from 'prop-types';
import { MdFavorite, MdFavoriteBorder, MdMoreVert } from 'react-icons/md';
import FavoriteSongIdb from '../data/favorite-song-idb';

function SongItem({ id, img, title, singer }) {
  const [ isFavorite, setIsFavorite ] = React.useState(false);

  React.useEffect(() => {
    const isSongExist = async (id) => {
      const isSongExist = await FavoriteSongIdb.getSong(id);
      if (isSongExist) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }

    isSongExist(id);
  }, [id]);

  return (
    <div className='song-item'>
      <img
        src='./images/skeleton/placeholder.webp'
        data-src={img}
        className='animate-fading__playlist lazyload'
        alt='' />
      <div className='song-item__body'>
        <div className='song-item__box-title'>
          <p className='song-item__title'>{title}</p>
          <p>{singer}</p>
        </div>
        {
          isFavorite
            ? (<button onClick={() => window.alert(`favorite clicked id: ${id}`)}>
                <MdFavorite className='song-item__icon' />
              </button>)
            : (<div></div>)
        }
        <button onClick={() => window.alert(`more ver clicked id: ${id}`)}>
          <MdMoreVert className='song-item__icon' />
        </button>
      </div>
    </div>);
}

SongItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  singer: PropTypes.string.isRequired,
}

export default SongItem;
