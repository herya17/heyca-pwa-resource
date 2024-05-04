import React from 'react';
import { MdPlayArrow, MdPause, MdArrowForwardIos, MdArrowBackIosNew, } from 'react-icons/md';
import { ost } from '../data/playlist';

function OstPlayer() {
  const audioPlayer = React.useRef();
  const [ index, setIndex ] = React.useState(0);
  const [ currentTitle, setCurrentTitle ] = React.useState(ost[0].title);
  const [ currentSong, setCurrentSong ] = React.useState(ost[index].src);
  const [ isPlaying, setIsPlaying ] = React.useState(false);
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
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }

    setIsPlaying(prev => !prev);
  }

  const togglePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      audioPlayer.current.src = ost[index - 1].src;
      setCurrentTitle(ost[index - 1].title);

      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }

  const toggleNext = () => {
    if (index >= ost.length - 1) {
      setIndex(0);
      audioPlayer.current.src = ost[0].src;
      setCurrentTitle(ost[0].title);

      if (isPlaying) {
        audioPlayer.current.play();
      }
    } else {
      setIndex(prev => prev + 1);
      audioPlayer.current.src = ost[index + 1].src;
      setCurrentTitle(ost[index + 1].title);

      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }

  const onEndedEventHandler = () => {
    toggleNext();
  }

  return (
    <div className='ost-player__container'>
      <p>{currentTitle}</p>
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
      <div className='ost-player__button'>
        <div className='ost-player__prev'>
          <button aria-label='Add to previous song' onClick={togglePrev}>
            <MdArrowBackIosNew />
          </button>
        </div>
        <div className='ost-player__play'>
          <button aria-label='Add to play and pause a song' onClick={togglePlay}>
            {isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
        </div>
        <div className='ost-player__next'>
          <button aria-label='Add to next song' onClick={toggleNext}>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OstPlayer;
