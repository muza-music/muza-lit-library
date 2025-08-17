import React, { type MouseEventHandler, useState } from "react";
import "./UploadSongLine.scss";
import type { SongDetails } from "../../appData/models";
import { formatSongNumber } from "../../appData/utils";
import MuzaIcon from "~/icons/MuzaIcon";

interface UploadSongLineProps {
  details: SongDetails;
  onClick: MouseEventHandler<HTMLDivElement>;
  isPlaying: boolean;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const formatPlayCount = (plays: number): string => {
  if (plays < 1000) return plays.toString();
  if (plays < 1000000) return `${(plays / 1000).toFixed(1)}K`;
  return `${(plays / 1000000).toFixed(1)}M`;
};

const UploadSongLine: React.FC<UploadSongLineProps> = ({
  details,
  onClick,
  isPlaying,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderIcon = () => {
    if (isPlaying && isHovered) {
      return (
        <span className="pause-icon">
          <MuzaIcon iconName="pause" />
        </span>
      );
    }
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-container">
        <div className="track-info">
          <div className="track-icon">{renderIcon()}</div>
          <div className="track-details">
            <span className="track-title">{details.title}</span>
            <span className="track-artist">{details.artist}</span>
          </div>
        </div>
        <div className="track-meta">
          {details.plays && details.plays > 0 && (
            <span className="play-count">
              {formatPlayCount(details.plays)} plays
            </span>
          )}
          <span className="track-duration">
            {details.time ? formatDuration(details.time) : ""}
          </span>
        </div>
        <div className="info-right">
          {isHovered && (
            <button className="ellipsis-btn" title="More options">
              <MuzaIcon iconName="ellipsis" />
            </button>
          )}
          <button className="add-btn" title="Add to playlist">
            <MuzaIcon iconName="plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSongLine;
