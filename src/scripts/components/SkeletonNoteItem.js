import React from 'react';

function SkeletonNoteItem() {
  return (
    <div className='note-item skeleton__animation skeleton-bars__wrapper'>
      <div className='note-item__article skeleton-bars'>
        <div style={{width: '77%', padding: '19px', marginBottom: '20px', marginTop: '10px'}}></div>
        <div style={{width: '92%', padding: '9px', marginBottom: '6px'}}></div>
        <div style={{width: '92%', padding: '9px', marginBottom: '6px'}}></div>
        <div style={{width: '80%', padding: '9px', marginBottom: '6px'}}></div>
        <div style={{width: '46%', padding: '7px', marginBottom: '15px', marginTop: '25px'}}></div>
      </div>
    </div>
  );
}

export default SkeletonNoteItem;
