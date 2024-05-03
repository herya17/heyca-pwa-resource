import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import Loader from '../components/Loader'
import EmptyMessage from '../components/EmptyMessage';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import Swal from 'sweetalert2';
import LocaleContext from '../contexts/LocaleContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DetailPage() {
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const { theme } = themeContextValue;

  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState([]);

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
      title: 'Kamu yakin ingin hapus kenangan ini?',
      text: "Kamu bisa batalin lohh kalo kamu masih peduli!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Gak peduli',
      cancelButtonText: 'Aku masih peduli',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNote(id);
        navigate('/');
        Swal.fire({
          icon: 'success',
          title: 'Kenangan sudah terhapus, jangan sedih aku selalu disisimu!',
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
