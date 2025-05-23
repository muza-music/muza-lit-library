import React, { useEffect, useRef, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaSpinner,
  FaRandom,
} from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import "./MusicPlayer.css";
import VolumeControl from "../../controls/VolumeControl";
import type { PlayerDetails } from "~/appData/models";

type MusicPlayerProps = {
  details: PlayerDetails;
  onPrevious?: () => void;
  onNext?: () => void;
  onUpdate?: (details: PlayerDetails) => void;
  onSongEnded?: () => void;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  details,
  onPrevious,
  onNext,
  onUpdate,
  onSongEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const handleVolumeChange = (newVolume: number) => {
    const normalizedVolume = newVolume / 100;
    setVolume(normalizedVolume);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = normalizedVolume;
    }
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch((err) => {
      console.error("Error playing audio:", err);
      onUpdate?.({ ...details, isPlaying: false });
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !details.audioUrl) return;

    const onLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
      if (details.isPlaying) playAudio();
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      onUpdate?.({ ...details, isPlaying: false });
      onSongEnded?.();
    };

    const onPlay = () => onUpdate?.({ ...details, isPlaying: true });
    const onPause = () => onUpdate?.({ ...details, isPlaying: false });

    const onLoadStart = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("waiting", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);

    audio.src = details.audioUrl;
    audio.load();
    audio.volume = volume;

    if (details.isPlaying) {
      playAudio();
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("waiting", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [details.audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (details.isPlaying && !isLoading) {
      playAudio();
    } else if (!details.isPlaying) {
      audio.pause();
    }
  }, [details.isPlaying, isLoading]);

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
    onUpdate?.({ ...details, isPlaying: !details.isPlaying });
    if (!details.isPlaying) {
      playAudio();
    } else {
      audioRef.current?.pause();
    }
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} hidden />
      <div className="player-container">
        {/* Left section - Player Info */}
        <div className="player-info">
          <img
            className="album-art"
            src={details.imageSrc}
            alt={`${details.title} album cover`}
          />
          <div className="track-info-music-player">
            <h2 className="track-title">{details.title}</h2>
            <p className="track-artist">{details.artist}</p>
            <div className="track-details">
              <span>{details.album}</span>
              <span className="separator">•</span>
              <span>{details.year}</span>
            </div>
          </div>
        </div>

        {/* Right section - Player Controls */}
        <div className="player-controls-section">
          {/* Progress bar - full width, no padding */}
          <div className="progress-container">
            <div className="progress-bar" onClick={handleSeek}>
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
              {/* Removed the handle button */}
            </div>
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration - currentTime)}</span>
            </div>
          </div>

          {/* Playback controls */}
          <div className="controls-container">
            <div className="controls-spacer"></div>
            <div className="playback-controls">
              <button
                className={`control-button shuffle-button ${shuffle ? "active" : ""}`}
                onClick={() => setShuffle(!shuffle)}
                aria-label="Shuffle"
              >
                <FaRandom />
              </button>
              <button
                className="control-button previous-button"
                onClick={onPrevious}
                aria-label="Previous track"
              >
                <FaBackward />
              </button>
              <button
                className="control-button play-button"
                onClick={togglePlayPause}
                aria-label="Play or pause"
              >
                {isLoading ? (
                  <FaSpinner className="spinner" />
                ) : details.isPlaying ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
              </button>
              <button
                className="control-button next-button"
                onClick={onNext}
                aria-label="Next track"
              >
                <FaForward />
              </button>
              <button
                className={`control-button repeat-button ${repeat ? "active" : ""}`}
                onClick={() => setRepeat(!repeat)}
                aria-label="Repeat"
              >
                <FaRepeat />
              </button>
            </div>
            <div className="volume-control-container">
              <VolumeControl
                noSymbol={true}
                value={volume * 100}
                onVolumeChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
