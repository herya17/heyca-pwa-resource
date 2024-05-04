import React from 'react';
import PropTypes from 'prop-types';
import SkeletonNoteItem from '../components/SkeletonNoteItem';
import NoteList from '../components/NoteList';
import EmptyMessage from '../components/EmptyMessage';
import LocaleContext from '../contexts/LocaleContext';

function HomePage({ isLoading, isOffline, filteredNotes }) {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;

  if (isLoading) {
    return (
      <div className='note-list'>
        <SkeletonNoteItem key={0} />
        <SkeletonNoteItem key={1} />
        <SkeletonNoteItem key={2} />
        <SkeletonNoteItem key={3} />
      </div>
    );
  }

  if (isOffline === true) {
    return <EmptyMessage message={locale === 'id' ? 'Periksa koneksi kamu!' : 'Check your connection!'} />;
  }

  return (
    <>
      {
        filteredNotes.length > 0
          ? <NoteList notes={filteredNotes} />
          : <EmptyMessage 
              message={locale === 'id' 
                ? 'Catatan aktif kosong, tidak dapat ditemukan!' 
                : 'Empty active note, could not be found!'} />
      }
    </>
  );
}

HomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isOffline: PropTypes.bool.isRequired,
  filteredNotes: PropTypes.arrayOf(PropTypes.object),
}

export default HomePage;
