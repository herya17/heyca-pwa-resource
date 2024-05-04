import React from 'react';
import PropTypes from 'prop-types';

function ActionButton({ id, icon, type, onDelete, onArchive, onUnarchive }) {
  if (type === 'delete') {
    return (
      <div className='action-button btn-delete'>
        <button aria-label='Add to delete note' className='red' type={type} onClick={() => onDelete(id)}>
          {icon}
        </button>
      </div>
    );
  }

  if (type === 'archive') {
    return (
      <div className='action-button'>
        <button aria-label='Add to archive note' className='btn-archive' type={type} onClick={() => onArchive(id)}>
          {icon}
        </button>
      </div>
    );
  }

  if (type === 'unarchive') {
    return (
      <div className='action-button'>
        <button aria-label='Add to unarchive note' className='btn-archive' type={type} onClick={() => onUnarchive(id)}>
          {icon}
        </button>
      </div>
    );
  }

  return (
    <div className='action-button'>
      <button aria-label='Add to adding note' type={type}>
        {icon}
      </button>
    </div>
  );
}

ActionButton.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.element.isRequired,
  type: PropTypes.string,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
}

export default ActionButton;
