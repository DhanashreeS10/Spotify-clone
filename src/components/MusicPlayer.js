import { useEffect, useRef, useState } from "react";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function MusicPlayer({ currentSong, onLike, likedSongs = [] }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
  };

  return (
    <div className="music-player">
      <div className="now-playing">
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
          />
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="controls">
        <button
          type="button"
          className={`like-btn ${isLiked ? "liked" : ""}`}
          onClick={() => currentSong && onLike(currentSong)}
          disabled={!currentSong}
        >
          {isLiked ? "♥" : "♡"}
        </button>

        <button
          type="button"
          className="play-btn"
          onClick={togglePlay}
          disabled={!currentSong}
        >
          {isPlaying ? "Pause" : "Play"}
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
