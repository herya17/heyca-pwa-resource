import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePageWrapper from './pages/HomePageWrapper';
import AddPage from './pages/AddPage';
import ArchivedPageWrapper from './pages/ArchivedPageWrapper';
import DetailPage from './pages/DetailPage';
import FirstPage from './pages/FirstPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SongPage from './pages/SongPage';
import PlaylistPage from './pages/PlaylistPage';
import NoPage from './pages/NoPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import LocaleContext from './contexts/LocaleContext';
import Swal from 'sweetalert2';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(() => {
    return localStorage.getItem('locale') || 'id';
  });
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [ idLyric, setIdLyric ] = React.useState(0);
  const [ isPlaying, setIsPlaying ] = React.useState(false);

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

    document.documentElement.setAttribute('data-theme', theme);
    getData();
  }, []);

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
      locale,
      toggleLocale,
    }
  }, [locale]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    })
  }

  const themeContextValue = React.useMemo(() => {
    return {
      theme, toggleTheme,
    }
  }, [theme]);

  const toggleIdLyric = (id) => {
    setIdLyric(id);
  }

  const idLyricContextValue = React.useMemo(() => {
    return {
      idLyric, toggleIdLyric,
    }
  }, [idLyric]);

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
      idLyricContextValue,
      isPlayingContextValue,
    }
  }, [ locale, theme, idLyric, isPlaying, ]);

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
      title: 'Kamu kenapa? Yakin ingin pergi?',
      text: "Aku gak mau kamu pergi, aku ingin bersama kamu terus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Tetap pergi',
      cancelButtonText: 'Tetap bersama',
    }).then((result) => {
      if (result.isConfirmed) {
        setAuthedUser(null);
        putAccessToken('');
        navigate('/');
        Swal.fire({
          icon: 'success',
          title: 'HeyCa!! Selalu MenantiMu!',
          text: "Aku akan selalu ada untukmu dan selalu merindukanmu!",
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
          <MusicPlayer />
        </header>
        <main id='mainContent'>
          <Routes>
            <Route path='/' element={<HomePageWrapper />} />
            <Route path='/add' element={<AddPage />} />
            <Route path='/archived' element={<ArchivedPageWrapper />} />
            <Route path='/notes/:id' element={<DetailPage />} />
            <Route path='/song' element={<SongPage />} />
            <Route path='/song-liked' element={<PlaylistPage title={locale === 'id' ? 'Disukai' : 'Liked'} />} />
            <Route path='/song-new' element={<PlaylistPage title={locale === 'id' ? 'Hal baru' : 'New thing'} />} />
            <Route path='/song-played' element={<PlaylistPage title={locale === 'id' ? 'Baru saja dimainkan' : 'Just played'} />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </main>
      </LocaleContext.Provider>
    </>
  );
}

export default App;
