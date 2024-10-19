import React from 'react';
import PropTypes from 'prop-types';
import { MdFavorite, MdMoreVert, MdArrowBackIosNew } from 'react-icons/md';
import FavoriteSongIdb from '../data/favorite-song-idb';
import LocaleContext from '../contexts/LocaleContext';

function SongItem({ id, img, title, singer }) {
  const [ isFavorite, setIsFavorite ] = React.useState(false);
  const { indexContextValue, isPlayingContextValue } = React.useContext(LocaleContext);
  const { toggleIndex } = indexContextValue;
  const { isPlaying, toggleIsPlaying } = isPlayingContextValue;

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

  const onImageClickedHandler = (url) => {
		const myModal = document.getElementById('myModal');
		const modalImg = document.getElementById('modalImg');

		myModal.style.display = 'block';
		modalImg.src = url;
  }
  
  const onCloseHandler = () => {
		const myModal = document.getElementById('myModal');
    myModal.style.display = 'none';
  }

  const btnFavoriteEventHandler = (event, id, msg) => {
    event.stopPropagation();

    window.alert(`btn clicked ${msg} id: ${id}`);
  }

  const btnSetMusicPlayerHandler = (event, id) => {
    event.stopPropagation();

    toggleIndex(id);
    toggleIsPlaying();
  }

  return (
    <div className='song-item'>
      <img
        src='./images/skeleton/placeholder.webp'
        data-src={img}
        className='animate-fading__playlist lazyload'
        alt=''
        onClick={() => onImageClickedHandler(img)} />
      <div id='myModal' className='modal'>
				<span className='close' onClick={onCloseHandler}>
					<MdArrowBackIosNew />
				</span>
				<img className='modal-content' id='modalImg' alt='' />
			</div>
      <button className='song-item__body' onClick={(event) => btnFavoriteEventHandler(event, id, 'choose music')}>
        <div className='song-item__box-title'>
          <p className='song-item__title'>{title}</p>
          <p>{singer}</p>
        </div>
        {
          isFavorite
            ? (<button onClick={(event) => btnFavoriteEventHandler(event, id, 'favorite')}>
                <MdFavorite className='song-item__icon' />
              </button>)
            : (<div></div>)
        }
        <button onClick={(event) => btnFavoriteEventHandler(event, id, 'options')}>
          <MdMoreVert className='song-item__icon' />
        </button>
      </button>
    </div>);
}

SongItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  singer: PropTypes.string.isRequired,
}

export default SongItem;
