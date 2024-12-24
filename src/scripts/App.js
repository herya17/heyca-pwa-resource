import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getUserLogged, putAccessToken } from './data/notesapi-source';
import { newSongs, songs } from './data/playlist';
import FavoriteSongIdb from './data/favorite-song-idb';
import FirstPage from './pages/FirstPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import HomePageWrapper from './pages/HomePageWrapper';
import AddPage from './pages/AddPage';
import ArchivedPageWrapper from './pages/ArchivedPageWrapper';
import DetailPage from './pages/DetailPage';
import SongPage from './pages/SongPage';
import PlaylistPage from './pages/PlaylistPage';
import NotificationPage from './pages/NotificationPage';
import NoPage from './pages/NoPage';
import LocaleContext from './contexts/LocaleContext';
import Swal from 'sweetalert2';

function App() {
  const navigate = useNavigate();
  const [ locale, setLocale ] = React.useState(() => {
    return localStorage.getItem('locale') || 'id';
  });
  const [ theme, setTheme ] = React.useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [ authedUser, setAuthedUser ] = React.useState(null);
  const [ initializing, setInitializing ] = React.useState(true);
  const [ index, setIndex ] = React.useState(0);
  const [ isPlaying, setIsPlaying ] = React.useState(false);
  const [ likedIsPlaying, setLikedIsPlaying ] = React.useState(false);
  const [ newIsPlaying, setNewIsPlaying ] = React.useState(false);
  const [ allIsPlaying, setAllIsPlaying ] = React.useState(false);
  const [ likedSong, setLikedSong ] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
        setInitializing(false);
      } catch (e) {
        console.log(e);
      }
    }

    getData();
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  React.useEffect(() => {
    const getAllSong = async () => {
      try {
        const songs = await FavoriteSongIdb.getAllSong();
        setLikedSong(songs);
      } catch (e) {
        console.log(e);
      }
    }

    getAllSong();
  }, [likedSong]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  }

  const localeContextValue = React.useMemo(() => {
    return {
      locale, toggleLocale,
    }
  }, [locale]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  const themeContextValue = React.useMemo(() => {
    return {
      theme, toggleTheme,
    }
  }, [theme]);

  const toggleIndex = (index) => {
    setIndex(index);
  }

  const indexContextValue = React.useMemo(() => {
    return {
      index, toggleIndex,
    }
  }, [index]);

  const toggleIsPlaying = () => {
    setIsPlaying(prev => !prev);
  }

  const isPlayingContextValue = React.useMemo(() => {
    return {
      isPlaying, toggleIsPlaying,
    }
  })

  const contextValue = React.useMemo(() => {
    return {
      localeContextValue,
      themeContextValue,
      indexContextValue,
      isPlayingContextValue,
    }
  }, [ locale, theme, index, isPlaying, ]);



  const toggleLikedSongPlay = (value) => {
    setLikedIsPlaying(prev => !prev);
    setIsPlaying(value);
  }

  const toggleNewSongPlay = (value) => {
    setNewIsPlaying(prev => !prev);
    setIsPlaying(value);
  }

  const toggleAllSongPlay = (value) => {
    setAllIsPlaying(prev => !prev);
    setIsPlaying(value);
  }

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    try {
      const { data } = await getUserLogged();
      setAuthedUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  const onLogout = () => {
    Swal.fire({
      title: 'Kamu benar ingin pergi?',
      text: 'Baiklah, aku mengerti perasaanmu bukan untukku kan, ada seseorang yg lebih memikirkanmu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Pergi',
      cancelButtonText: 'Batal pergi',
    }).then((result) => {
      if (result.isConfirmed) {
        setAuthedUser(null);
        putAccessToken('');
        navigate('/');
        Swal.fire({
          icon: 'success',
          title: 'HeyCa akan baik-baik saja!',
          text: 'Tidak usah pedulikan HeyCa, pikirkan saja sana orang yg kamu cintai!',
          showConfirmButton: true,
        });
      }
    });
  }

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={contextValue}>
        <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage loginSuccess={onLoginSuccess} />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </LocaleContext.Provider>
    );
  }

  return (
    <>
      <LocaleContext.Provider value={contextValue}>
        <header className='header-home'>
          <Navigation logout={onLogout} name={authedUser.name} />
          <MusicPlayer songs={songs} />
        </header>
        <main id='mainContent'>
          <Routes>
            <Route path='/' element={<HomePageWrapper />} />
            <Route path='/add' element={<AddPage />} />
            <Route path='/archived' element={<ArchivedPageWrapper />} />
            <Route path='/notification' element={<NotificationPage />} />
            <Route path='/notes/:id' element={<DetailPage />} />
            <Route
              path='/song'
              element={
                <SongPage
                  likedSongLength={likedSong.length}
                  newSongLength={newSongs.length}
                  playedSongLength={songs.length} />} />
            <Route
              path='/song-liked'
              element={
                <PlaylistPage
                  title={locale === 'id' ? 'Disukai' : 'Liked'}
                  songLength={likedSong.length}
                  isPlaying={likedIsPlaying}
                  toggleIsPlaying={toggleLikedSongPlay}
                  songs={likedSong} />} />
            <Route
              path='/song-new'
              element={
                <PlaylistPage
                  title={locale === 'id' ? 'Hal baru' : 'New thing'}
                  songLength={newSongs.length}
                  isPlaying={newIsPlaying}
                  toggleIsPlaying={toggleNewSongPlay}
                  songs={newSongs} />} />
            <Route
              path='/song-played'
              element={
                <PlaylistPage
                  title={locale === 'id' ? 'Baru saja dimainkan' : 'Just played'}
                  songLength={songs.length}
                  isPlaying={allIsPlaying}
                  toggleIsPlaying={toggleAllSongPlay}
                  songs={songs} />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </main>
      </LocaleContext.Provider>
    </>
  );
}

export default App;
