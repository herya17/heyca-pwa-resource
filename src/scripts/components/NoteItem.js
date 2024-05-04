import React from 'react';
import { showFormattedDate } from '../utils/showFormattedDate';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

function NoteItem({ id, title, createdAt, body }) {
  let description = body;

  if (description.length > 80) {
    description = body.substring(0, 80) + '...';
  }

  return (
    <div className='note-item note-item__animation'>
      <div className='note-item__article'>
        <p className='note-item__title'>{title}</p>
        <p className='note-item__body'>{description}</p>
      </div>
      <div className='note-item__action'>
        <p className='note-item__date'>{showFormattedDate(createdAt)}</p>
        <Link aria-label='Add to see detail note' to={`/notes/${id}`} className='note-item__action-btn'>
          <MdOutlineRemoveRedEye />
        </Link>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

export default NoteItem;
