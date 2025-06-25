import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./MusicPlayer.scss";
import VolumeControl from "../../controls/VolumeControl";
import MuzaIcon from "~/icons/MuzaIcon";
import type { PlayerDetails } from "~/appData/models";

type MusicPlayerProps = {
  details: PlayerDetails;
  onPrevious?: () => void;
  onNext?: () => void;
  onUpdate?: (details: PlayerDetails) => void;
  onSongEnded?: () => void;
  setIsPlaying: (b: Boolean) => void;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  details,
  onPrevious,
  onNext,
  onUpdate,
  onSongEnded,
  setIsPlaying,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio state
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isLoading, setIsLoading] = useState(false);

  // Control state
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // Helper functions
  const formatTime = (seconds: number): string => {
    // Handle edge cases
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) {
      return "0:00";
    }
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Audio control functions
  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch((err) => {
      console.error("Error playing audio:", err);
      setIsPlaying(false);
      onUpdate?.({ ...details });
    });
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlayPause = () => {
    if (isLoading) return;
    const newPlayingState = !details.isPlaying;
    setIsPlaying(newPlayingState);
    onUpdate?.({ ...details });
  };

  // Effects
  useEffect(() => {
    setIsPlaying(details.isPlaying || false);
  }, [details.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (details.isPlaying && !isLoading) {
      playAudio();
    } else if (!details.isPlaying) {
      audio.pause();
    }
  }, [details.isPlaying, isLoading]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !details.audioUrl) return;

    // Audio event handlers
    const handleLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
      if (details.isPlaying) playAudio();
    };

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    const handleEnded = () => {
      setIsPlaying(false);
      onUpdate?.({ ...details });
      onSongEnded?.();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onUpdate?.({ ...details });
    };

    const handlePause = () => {
      setIsPlaying(false);
      onUpdate?.({ ...details });
    };

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    // Add event listeners
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("waiting", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    // Setup audio
    audio.src = details.audioUrl;
    audio.volume = volume / 100;
    audio.load();

    if (details.isPlaying) playAudio();

    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("waiting", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [details.audioUrl]);

  return (
    <div className="music-player">
      <audio ref={audioRef} hidden />

      <div className="player-info">
        <img
          className="album-art"
          src={details.imageSrc}
          alt={`${details.title} album cover`}
        />
        <div className="track-info">
          <h3 className="track-title">{details.title}</h3>
          <p className="track-artist">{details.artist}</p>
          <div className="track-details">
            <span>{details.album}</span>
            <span className="separator">•</span>
            <span>{details.year}</span>
          </div>
        </div>
      </div>

      <div className="player-controls">
        <div className="progress-section">
          <div className="progress-bar" onClick={handleSeek}>
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration - currentTime)}</span>
          </div>
        </div>

        <div className="controls-row">
          <div className="playback-controls">
            <button
              className={`control-btn shuffle ${shuffle ? "active" : ""}`}
              onClick={() => setShuffle(!shuffle)}
              aria-label="Shuffle"
            >
              <MuzaIcon iconName="shuffle" />
            </button>

            <button
              className="control-btn previous"
              onClick={onPrevious}
              aria-label="Previous track"
            >
              <MuzaIcon iconName="skip-back" />
            </button>

            <button
              className="control-btn play"
              onClick={togglePlayPause}
              aria-label="Play or pause"
            >
              {isLoading ? (
                <FaSpinner className="spinner" />
              ) : details.isPlaying ? (
                <MuzaIcon iconName="pause" />
              ) : (
                <MuzaIcon iconName="play" />
              )}
            </button>

            <button
              className="control-btn next"
              onClick={onNext}
              aria-label="Next track"
            >
              <MuzaIcon iconName="skip-forward" />
            </button>

            <button
              className={`control-btn repeat ${repeat ? "active" : ""}`}
              onClick={() => setRepeat(!repeat)}
              aria-label="Repeat"
            >
              <MuzaIcon iconName="repeat" />
            </button>
          </div>

          <div className="volume-section">
            <VolumeControl
              noSymbol={true}
              value={volume}
              onVolumeChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
