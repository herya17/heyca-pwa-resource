import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { songs } from '../data/playlist';
import lyrics from '../data/lyrics';
import MusicPlayerCatalog from '../components/MusicPlayerCatalog';
import PlaylistButton from '../components/PlaylistButton';
import LyricMusic from '../components/LyricMusic';
import ActionButton from '../components/ActionButton';
import LocaleContext from '../contexts/LocaleContext';

function SongPage() {
  const { idLyricContextValue, localeContextValue } = React.useContext(LocaleContext);
  const { idLyric } = idLyricContextValue;
  const { locale } = localeContextValue;
  const [ data, setData ] = React.useState({song: {}, lyric: {}});
  const [ isLoading, setLoading ] = React.useState(true);

  React.useEffect(() => {
    const getData = (id) => {
      setLoading(true);
      const currentSong = songs[id];
      const currentLyric = lyrics[id];
      const currentData = {
        song: currentSong,
        lyric: currentLyric,
      }
      setData(currentData);

      setTimeout(() => {
        setLoading(false);
      }, 860);
    }

    getData(idLyric);
  }, [idLyric]);

  return (
    <section>
      <div>
        <MusicPlayerCatalog song={data.song} />
      </div>
      <div>
        <PlaylistButton
          duration='200'
          img='./images/icons/favorite'
          url='/song-liked'
          text={locale === 'id' ? 'Disukai' : 'Liked'}
          length={0} />
        <PlaylistButton
          duration='300'
          img='./images/icons/music'
          url='/song-new'
          text={locale === 'id' ? 'Hal baru' : 'New thing'}
          length={0} />
        <PlaylistButton
          duration='400'
          img='./images/icons/timer'
          url='/song-played'
          text={locale === 'id' ? 'Baru saja dimainkan' : 'Just played'}
          length={36} />
      </div>
      <LyricMusic isLoading={isLoading} lyric={data.lyric} />
      <Link to='/add'>
        <ActionButton icon={<MdAdd />} />
      </Link>
    </section>
  );
}

export default SongPage;
