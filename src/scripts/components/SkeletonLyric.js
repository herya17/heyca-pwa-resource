import React from 'react';

function SkeletonLyric() {
  return (
    <div className={`note-item skeleton__animation lyric-music__container`}>
      <div className='note-item__article'>
        <div className='note-item__title skeleton-bars'>
          <div style={{width: '20%', padding: '18px', marginBottom: '25px'}}></div>
        </div>
        <div className='note-item__body lyric-music__lyric skeleton-bars skeleton-bars__wrapper'>
          <div style={{width: '85%', padding: '18px', marginBottom: '25px'}}></div>
          <div style={{width: '60%', padding: '18px', marginBottom: '25px'}}></div>
          <div style={{width: '75%', padding: '18px', marginBottom: '25px'}}></div>
          <div style={{width: '60%', padding: '18px', marginBottom: '25px'}}></div>
          <div style={{width: '90%', padding: '18px', marginBottom: '25px'}}></div>
          <div style={{width: '80%', padding: '18px', marginBottom: '25px'}}></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLyric;
