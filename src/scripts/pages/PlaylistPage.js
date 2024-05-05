import React from 'react';
import PropTypes from 'prop-types';
import { MdPlayArrow } from 'react-icons/md';
import SongList from '../components/SongList';
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
      <SongList songs={songs} />
    </section>
  );
}

PlaylistPage.propTypes = {
  title: PropTypes.string.isRequired,
  songLength: PropTypes.number,
}

export default PlaylistPage;
