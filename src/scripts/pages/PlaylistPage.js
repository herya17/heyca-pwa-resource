import React from 'react';
import PropTypes from 'prop-types';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import SongList from '../components/SongList';
import EmptyMessage from '../components/EmptyMessage';
import LocaleContext from '../contexts/LocaleContext';

function PlaylistPage({ title, songLength, isPlaying, toggleIsPlaying, songs }) {
  const { localeContextValue, isPlayingContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  // const { isPlaying, toggleIsPlaying } = isPlayingContextValue;

  return (
    <section>
      <div className='playlist-page__header'>
        <div className='playlist-page__header-box-title'>
          <p className='playlist-page__header-title'>
            {title}<span>{songLength} {locale === 'id' ? 'lagu' : 'songs'}</span>
          </p>
        </div>
        {
          isPlaying
            ? (<button>
                <MdPause className='playlist-page__icon' onClick={() => toggleIsPlaying(false)} />
              </button>)
            : (<button>
                <MdPlayArrow className='playlist-page__icon' onClick={() => toggleIsPlaying(true)} />
              </button>)
        }
      </div>
      {
        songs.length > 0
          ? <SongList songs={songs} />
          : <EmptyMessage 
              message={locale === 'id' 
                ? `Belum ada lagu ${title}!`
                : `There are no ${title} yet!`} />
      }
    </section>
  );
}

PlaylistPage.propTypes = {
  title: PropTypes.string.isRequired,
  songLength: PropTypes.number,
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PlaylistPage;
