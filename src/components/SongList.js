import React from 'react';
import SongItem from './SongItem';
import PropTypes from 'prop-types';

function SongList({ songs }) {
  return (
    <div className='song-list'>
      {
        songs.map((song) => (
          <SongItem key={song.id} {...song} />
        ))
      }
    </div>
  );
}

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default SongList;
