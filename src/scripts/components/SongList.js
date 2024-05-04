import React from 'react';
import PropTypes from 'prop-types';
import SongItem from './SongItem';

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
