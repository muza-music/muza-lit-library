import React, { useEffect, useRef, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaSpinner,
} from "react-icons/fa";
import "./MusicPlayer.css";

interface PlayerDetails {
  audioUrl: string;
  imageSrc: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  isPlaying: boolean;
  id?: string;
}

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

  const progressPercentage =
    duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;
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
  };

  // if (!details.src) return null;

  return (
    <div className="music-player">
      <audio ref={audioRef} hidden />
      <div className="player">
        <img className="album-art" src={details.imageSrc} alt="Album Art" />
        <div className="track-info">
          <h4>{details.title}</h4>
          <p>{details.artist}</p>
          <h5>
            {details.album} • {details.year}
          </h5>
        </div>
        <div className="player-controls">
          <div className="progress-bar" onClick={handleSeek}>
            <div
              className="progress"
              style={{ width: progressPercentage }}
            ></div>
          </div>
          <div className="durations">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration - currentTime)}</span>
          </div>
          <div className="controls">
            <button className="prev-next-button" onClick={onPrevious}>
              <FaBackward />
            </button>
            <button className="play-pause-button" onClick={togglePlayPause}>
              {isLoading ? (
                <FaSpinner className="fa-spin" />
              ) : details.isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
            <button className="prev-next-button" onClick={onNext}>
              <FaForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
