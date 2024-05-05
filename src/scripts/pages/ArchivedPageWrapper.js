import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { getArchivedNotes } from '../data/notesapi-source';
import SearchBar from '../components/SearchBar';
import ActionButton from '../components/ActionButton';
import ArchivedPage from './ArchivedPage';

function ArchivedPageWrapper() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ notes, setNotes ] = React.useState([]);
  const [ keyword, setKeyword ] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });
  const [ isLoading, setLoading ] = React.useState(true);
  const [ isOffline, setIsOffline ] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      
      try {
        const { data } = await getArchivedNotes();
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
        <ArchivedPage isLoading={isLoading} isOffline={isOffline} filteredNotes={filteredNotes} />
        <Link to='/add'>
          <ActionButton icon={<MdAdd />} />
        </Link>
    </section>
  );
}

export default ArchivedPageWrapper;
