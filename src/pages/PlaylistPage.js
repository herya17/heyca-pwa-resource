import React from 'react';
import { MdPlayArrow } from 'react-icons/md';
import SongList from '../components/SongList';
import { songs } from '../utils/playlist';
import LocaleContext from '../contexts/LocaleContext';

function PlaylistPage({ title, lengthSong = '36' }) {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;

  return (
    <section>
      <div className='playlist-page__header'>
        <div className='playlist-page__header-box-title'>
          <p className='playlist-page__header-title'>
            {title}<span>{lengthSong} {locale === 'id' ? 'lagu' : 'songs'}</span>
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

export default PlaylistPage;
