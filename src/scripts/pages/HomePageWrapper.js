import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { getActiveNotes } from '../data/notesapi-source';
import HomePage from './HomePage';
import SearchBar from '../components/SearchBar';
import ActionButton from '../components/ActionButton';
import LocaleContext from '../contexts/LocaleContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePageWrapper() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ keyword, setKeyword ] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });
  const { themeContextValue } = React.useContext(LocaleContext);
  const { theme } = themeContextValue;
  const [ notes, setNotes ] = React.useState([]);
  const [ isLoading, setLoading ] = React.useState(true);
  const [ isOffline, setIsOffline ] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const { data } = await getActiveNotes();
        setTimeout(() => {
          setLoading(false);
          setNotes(data);
        }, 680);
      } catch {
        setLoading(false);
        setIsOffline(true);
      }
    }

    getData();
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => (
    note.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  ));

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme={theme === 'light' ? 'light' : 'dark'} />
        <HomePage isLoading={isLoading} isOffline={isOffline} filteredNotes={filteredNotes} />
        <Link to='/add'>
          <ActionButton icon={<MdAdd />} />
        </Link>
    </section>
  );
}

export default HomePageWrapper;
