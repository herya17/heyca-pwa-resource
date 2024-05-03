import React from 'react';
import PropTypes from 'prop-types';
import SkeletonLyric from '../components/SkeletonLyric';

function LyricMusic({ isLoading, lyric }) {
  if (isLoading) {
    return <SkeletonLyric />;
  }

  return (
    <div className='note-item lyric-music__container'>
      <div className='note-item__article'>
        <p className='note-item__title lyric-music__title'>Lyric</p>
        <div className='note-item__body lyric-music__lyric'>
          <pre>{lyric.text}</pre>
        </div>
      </div>
    </div>
  );
}

LyricMusic.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lyric: PropTypes.object.isRequired,
}

export default LyricMusic;
