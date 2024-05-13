import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  MdPlayArrow,
  MdPause,
  MdArrowForwardIos,
  MdArrowBackIosNew,
} from 'react-icons/md';
import LocaleContext from '../contexts/LocaleContext';

function MusicPlayer({ songs }) {
  const audioPlayer = React.useRef();
  const { indexContextValue, isPlayingContextValue } = React.useContext(LocaleContext);
  const { toggleIndex } = indexContextValue;
  const { isPlaying, toggleIsPlaying } = isPlayingContextValue;
  // const [ isPlaying, setIsPlaying ] = React.useState(false);
  const [ index, setIndex ] = React.useState(0);
  const [ currentTitle, setCurrentTitle ] = React.useState(songs[0].title);
  const [ currentSinger, setCurrentSinger ] = React.useState(songs[0].singer);
  const [ currentImg, setCurrentImg ] = React.useState(songs[0].img);
  const [ currentSong, setCurrentSong ] = React.useState(songs[index].src);
  const [ elapsed, setElapsed ] = React.useState(0);
  const [ duration, setDuration ] = React.useState(0);

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const _elapsed = Math.floor(audioPlayer.current.currentTime);
        const _duration = Math.floor(audioPlayer.current.duration);

        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
      return () => clearInterval(interval);
    }

    const strokeElement = document.querySelectorAll('.stroke');
      strokeElement.forEach(animation => {
        animation.style.animationPlayState = 'paused';
    });
  }, [isPlaying]);

  const togglePlay = () => {
    const strokeElement = document.querySelectorAll('.stroke');

    if (isPlaying) {
      audioPlayer.current.pause();
      strokeElement.forEach(animation => {
        animation.style.animationPlayState = 'paused';
      });
    } else {
      audioPlayer.current.play();
      strokeElement.forEach(animation => {
        animation.style.animationPlayState = 'running';
      });
    }

    // setIsPlaying(prev => !prev);
    toggleIsPlaying();
  }

  const togglePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      audioPlayer.current.src = songs[index - 1].src;
      setCurrentTitle(songs[index - 1].title);
      setCurrentSinger(songs[index - 1].singer);
      setCurrentImg(songs[index - 1].img);
      toggleIndex(index - 1);

      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }

  const toggleNext = () => {
    if (index >= songs.length - 1) {
      setIndex(0);
      audioPlayer.current.src = songs[0].src;
      setCurrentTitle(songs[0].title);
      setCurrentSinger(songs[0].singer);
      setCurrentImg(songs[0].img);
      toggleIndex(0);

      if (isPlaying) {
        audioPlayer.current.play();
      }
    } else {
      setIndex(prev => prev + 1);
      audioPlayer.current.src = songs[index + 1].src;
      setCurrentTitle(songs[index + 1].title);
      setCurrentSinger(songs[index + 1].singer);
      setCurrentImg(songs[index + 1].img);
      toggleIndex(index + 1);

      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }

  const onEndedEventHandler = () => {
    toggleNext();
  }

  const onImageClickedHandler = (url) => {
		const myModal = document.getElementById('myModal');
		const modalImg = document.getElementById('modalImg');

		myModal.style.display = 'block';
		modalImg.src = url;
	}

	const onCloseHandler = () => {
		const myModal = document.getElementById('myModal');
    myModal.style.display = 'none';
  }

  return (
    <div className='music-player__container'>
      <div className='music-player__box-img'>
        <img 
          src={currentImg}
          className='music-player__img animate-fading__player lazyload'
          alt=''
          onClick={() => onImageClickedHandler(currentImg)} />
        <div id='myModal' className='modal'>
					<span className='close' onClick={onCloseHandler}>
						<MdArrowBackIosNew />
					</span>
				  <img className='modal-content' id='modalImg' alt='' />
				</div>
      </div>
      <Link className='music-player__link-title' to={`/song`}>
        <div className='music-player__box-title'>
          <p className='music-player__title'>{currentTitle}</p>
          <p>{currentSinger}</p>
        </div>
      </Link>
      <div className='music-player__button'>
        <div className='music-player__prev'>
          <button aria-label='Add to previous song' onClick={togglePrev}>
            <MdArrowBackIosNew />
          </button>
        </div>
        <div className='music-player__play'>
          <button aria-label='Add to play and pause a song' onClick={togglePlay}>
            {isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
        </div>
        <div className='music-player__next'>
          <button aria-label='Add to next song' onClick={toggleNext}>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
      <div className='music-player__box-track'>
        <audio
          ref={audioPlayer}
          src={currentSong}
          onEnded={onEndedEventHandler} />
        <input
          aria-label='Range of songs'
          className='play-track'
          type='range'
          max={duration}
          defaultValue={`${elapsed == duration ? 0 : elapsed}`} />
      </div>
    </div>
  );
}

MusicPlayer.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MusicPlayer;
