import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import prevIcon from "../assets/backward_icon.png";
import nextIcon from "../assets/forward_icon.png";
import playIcon from "../assets/play_musicbar.png";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function MusicPlayer({ currentSong, onLike, likedSongs = [], onPrev, onNext }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const isLiked = currentSong
    ? likedSongs.some((song) => song.id === currentSong.id)
    : false;

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!isPlaying) return;

    audioRef.current
      .play()
      .catch((err) => console.error("Audio playback failed:", err));
  }, [isPlaying]);

  const togglePlay = async () => {
    if (!currentSong || !audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio playback failed:", err);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (typeof onNext === "function") {
      onNext();
    }
  };

  return (
    <div className="music-player">
      <div className="player-left">
        {currentSong ? (
          <>
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="song-img"
            />
            <div className="song-info">
              <p className="song-title">{currentSong.title}</p>
              <p className="song-by">{currentSong.artist}</p>
            </div>
            <img src={logo} alt="Logo" className="player-logo" />
          </>
        ) : (
          <p className="song-by">Select a song to play</p>
        )}
      </div>

      <div className="player-center">
        <div className="time-row">
          <span className="time-text">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
            style={{
              background: `linear-gradient(90deg, #1db954 ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
            }}
          />
          <span className="time-text">{formatTime(duration)}</span>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="nav-btn"
            onClick={onPrev}
            disabled={!currentSong}
            aria-label="Previous"
          >
            <img src={prevIcon} alt="Prev" />
          </button>

          <button
            type="button"
            className={`play-btn ${isPlaying ? "playing" : ""}`}
            onClick={togglePlay}
            disabled={!currentSong}
            aria-label="Play/Pause"
          >
            {isPlaying ? (
              <span className="pause-icon">
                <span />
                <span />
              </span>
            ) : (
              <img src={playIcon} alt="Play" className="play-icon" />
            )}
          </button>

          <button
            type="button"
            className="nav-btn"
            onClick={onNext}
            disabled={!currentSong}
            aria-label="Next"
          >
            <img src={nextIcon} alt="Next" />
          </button>
        </div>
      </div>

      <div className="player-right">
        <button
          type="button"
          className={`like-btn ${isLiked ? "liked" : ""}`}
          onClick={() => currentSong && onLike(currentSong)}
          disabled={!currentSong}
          aria-label="Like"
        >
          {isLiked ? "♥" : "♡"}
        </button>
      </div>

      <audio
        ref={audioRef}
        src={currentSong?.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </div>
  );
}

export default MusicPlayer;
