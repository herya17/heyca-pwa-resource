import React from 'react';
import PropTypes from 'prop-types';
import {
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentVeryDissatisfied
} from 'react-icons/md';

function EmptyMessage({ message, isNoPage }) {
  return (
    <div className='empty-message'>
      {
        isNoPage
          ? <MdOutlineSentimentVeryDissatisfied className='empty-message__icon' />
          : <MdOutlineSentimentDissatisfied className='empty-message__icon' />
      }
      <p>{message}</p>
    </div>
  );
}

EmptyMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isNoPage: PropTypes.bool,
}

export default EmptyMessage;
