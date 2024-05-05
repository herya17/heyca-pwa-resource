import React from 'react';
import PropTypes from 'prop-types';
import { MdPlayArrow } from 'react-icons/md';
import SongList from '../components/SongList';
import EmptyMessage from '../components/EmptyMessage';
import LocaleContext from '../contexts/LocaleContext';

function PlaylistPage({ title, songLength, songs }) {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;

  return (
    <section>
      <div className='playlist-page__header'>
        <div className='playlist-page__header-box-title'>
          <p className='playlist-page__header-title'>
            {title}<span>{songLength} {locale === 'id' ? 'lagu' : 'songs'}</span>
          </p>
        </div>
        <button>
          <MdPlayArrow className='playlist-page__icon' onClick={() => console.log(songs)} />
        </button>
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
