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

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    addNote({ 
      title, body
    });
  }

  return (
    <div className='note-input'>
      <form onSubmit={onSubmitEventHandler}>
        <input
          type='text'
          placeholder={locale === 'id' ? 'Judul' : 'Title'}
          required
          value={title}
          onChange={handleTitleChange} />
        <textarea
          type='text'
          placeholder={locale === 'id' ? 'Catatan' : 'Notes'}
          required
          value={body}
          onChange={handleBodyChange} />
        <ActionButton icon={<FiCheck />} type='submit' />
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;
