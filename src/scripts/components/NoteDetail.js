import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteOutline, MdFavoriteBorder, MdHeartBroken } from 'react-icons/md';
import { showFormattedDate } from '../utils/showFormattedDate';
import ActionButton from '../components/ActionButton';

function NoteDetail({ id, title, createdAt, body, archived, onDelete, onArchive, onUnarchive }) {
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

  return (
    <div className='note-detail'>
      {
        isTitleLoading
          ? <p className='note-detail__title'></p>
          : <p className='note-detail__title'>{title}</p>
      }
      {
        isBodyLoading
          ? <p className='note-detail__date'></p>
          : <p className='note-detail__date'>{showFormattedDate(createdAt)}</p>
      }
      {
        isBodyLoading
          ? <p className='note-detail__body'></p>
          : <p className='note-detail__body'>{body}</p>
      }
      <ActionButton icon={<MdDeleteOutline />} id={id} type='delete' onDelete={onDelete} />
      {
        archived
          ? <ActionButton icon={<MdHeartBroken />} id={id} type='unarchive' onUnarchive={onUnarchive} />
          : <ActionButton icon={<MdFavoriteBorder />} id={id} type='archive' onArchive={onArchive} />
      }
    </div>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  archived: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
}

export default NoteDetail;
