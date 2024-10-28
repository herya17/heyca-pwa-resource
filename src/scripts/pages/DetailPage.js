import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../data/notesapi-source';
import NoteDetail from '../components/NoteDetail';
import EmptyMessage from '../components/EmptyMessage';
import LocaleContext from '../contexts/LocaleContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const { theme } = themeContextValue;
  const [ notes, setNotes ] = React.useState([]);

  React.useEffect(() => {
    const getData = async (id) => {
      try {
        const { data } = await getNote(id);
        setNotes(data);
      } catch {
        setNotes(null);
      }
    }

    getData(id);
  }, [id]);

  const onDeleteNoteHandler = async (id) => {
    Swal.fire({
      title: 'Kamu mau hapus cerita ini?',
      text: "Baiklah, aku mengerti cintamu bukan untukku kan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Jangan hapus',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNote(id);
        navigate('/');
        Swal.fire({
          icon: 'success',
          title: 'Cerita sudah dihapus, semoga kamu mendapatkan cerita idaman kamu!',
          showConfirmButton: false,
          timer: 4000,
        });
      }
    });
  }

  const onArchiveNoteHandler = async (id) => {
    await archiveNote(id);
    toast.success(`${locale === 'id' ? '1 difavoritkan' : '1 favorite'}`, {
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

  const onUnarchiveNoteHandler = async (id) => {
    await unarchiveNote(id);
    navigate('/archived');
  }

  if (notes === undefined || notes === null) {
    return <EmptyMessage message={locale === 'id' ? 'Periksa koneksi kamu!' : 'Check your connection!'} />;
  }

  return (
    <section>
      <NoteDetail 
        onDelete={onDeleteNoteHandler} 
        onArchive={onArchiveNoteHandler}
        onUnarchive={onUnarchiveNoteHandler}
        {...notes} />
    </section>
  );
}

export default DetailPage;
