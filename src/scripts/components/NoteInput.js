import React from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import ActionButton from './ActionButton';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

function NoteInput({ addNote }) {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const [ title, handleTitleChange ] = useInput('');
  const [ body, handleBodyChange ] = useInput('');
  const [ isTitleLoading, setIsTitleLoading ] = React.useState(true);
  const [ isBodyLoading, setIsBodyLoading ] = React.useState(true);

  React.useEffect(() => {
    [
      { duration: 100, action: setIsTitleLoading },
      { duration: 230, action: setIsBodyLoading },
    ].map((data) => {
      setTimeout(() => {
        data.action(false);
      }, data.duration);
    });
  }, []);

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    addNote({ 
      title, body
    });
  }

  return (
    <div className='note-input'>
      <form onSubmit={onSubmitEventHandler}>
        {
          isTitleLoading
            ? <div className='note-input__title'></div>
            : <input
                className='note-input__title'
                type='text'
                placeholder={locale === 'id' ? 'Judul' : 'Title'}
                required
                value={title}
                onChange={handleTitleChange} />
        }
        {
          isBodyLoading
            ? <div className='note-input__body'></div>
            : <textarea
                className='note-input__body'
                type='text'
                placeholder={locale === 'id' ? 'Catatan' : 'Notes'}
                required
                value={body}
                onChange={handleBodyChange} />
        }
        <ActionButton icon={<FiCheck />} type='submit' />
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;
