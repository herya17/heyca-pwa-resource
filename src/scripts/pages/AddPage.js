import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../data/notesapi-source';
import LocaleContext from '../contexts/LocaleContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPage() {
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const { theme } = themeContextValue;
  const navigate = useNavigate();

  const onAddNoteHandler = async (note) => {
    await addNote(note);
    toast.success(`${locale === 'id' ? '1 ditambahkan' : '1 added'}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: `${theme === 'light' ? 'light' : 'dark'}`,
    });
    navigate('/');
  }

  return (
    <section>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;
