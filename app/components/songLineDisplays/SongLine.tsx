import React, { type MouseEventHandler } from "react";
import "./SongLine.scss";
import type { SongDetails } from "../../appData/models";
import { formatSongNumber } from "../../appData/utils";
import MuzaIcon from "~/icons/MuzaIcon";

interface SongLineProps {
  details: SongDetails;
  onClick: MouseEventHandler<HTMLDivElement>;
  isPlaying: boolean;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const SongLine: React.FC<SongLineProps> = ({ details, onClick, isPlaying }) => {
  const renderIcon = () => {
    if (isPlaying) {
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
          <MuzaIcon iconName="play" />
        </span>
      </>
    );
  };

  return (
    <div
      className={`song-line ${isPlaying ? "playing" : ""}`}
      onClick={onClick}
    >
      <div className="song-container">
        <div className="track-info">
          <div className="track-icon">{renderIcon()}</div>
          <span className="track-title">{details.title}</span>
          <span className="track-artist">{details.artist}</span>
        </div>
        <span className="track-duration">
          {details.time ? formatDuration(details.time) : ""}
        </span>
      </div>
    </div>
  );
};

export default SongLine;
