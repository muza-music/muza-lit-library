import React, { type MouseEventHandler } from "react";
import "./SongLine.css";
import type { SongDetails } from "../../appData/models";
import { formatSongNumber } from "../../appData/utils";

interface SongLineProps {
  details: SongDetails;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const SongLine: React.FC<SongLineProps> = ({ details, onClick }) => {
  const renderIcon = () => {
    if (details.isPlaying) {
      return (
        <div className="wave-container">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      );
    }

    return (
      <>
        <span className="track-number">
          {formatSongNumber(details.index || 1)}
        </span>
        <span className="play-icon">
          <i className="fa-solid fa-play"></i>
        </span>
      </>
    );
  };

  return (
    <div className="song-line" onClick={onClick}>
      <div className="song-container">
        <div className="track-info">
          {renderIcon()}
          <span className="track-title">{details.title}</span>
        </div>
        <span className="track-duration">
          {details.time ? formatDuration(details.time) : ""}
        </span>
      </div>
    </div>
  );
};

export default SongLine;
