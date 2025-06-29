import React, { type MouseEventHandler, useState } from "react";
import "./SongDetails.scss";
import type { SongDetails as SongDetailsType } from "../../appData/models";
import MuzaIcon from "~/icons/MuzaIcon";

interface SongDetailsProps {
  details: SongDetailsType;
  onClick: MouseEventHandler<HTMLDivElement>;
  isPlaying?: boolean;
  isActive?: boolean;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const formatPlays = (plays: number): string => {
  return `${plays.toLocaleString()} Plays`;
};

const SongDetails: React.FC<SongDetailsProps> = ({
  details,
  onClick,
  isPlaying = false,
  isActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const renderPlayButton = () => {
    if (isActive) {
      return <MuzaIcon iconName="pause" />;
    }
    return <MuzaIcon iconName="play" />;
  };

  return (
    <div
      className={`song-details ${isHovered ? "hover" : ""} ${isActive ? "active" : ""}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="song-info">
        <div className="cover-container">
          <div
            className="cover-image"
            style={{
              backgroundImage: `url(${details.imageSrc || "/art/imag_1.jpg"})`,
            }}
          >
            {(isHovered || isActive) && (
              <div className="play-overlay">
                <div className="play-button">{renderPlayButton()}</div>
              </div>
            )}
          </div>
        </div>

        <div className="track-details">
          <div className={`track-title ${isActive ? "active" : ""}`}>
            {details.title}
          </div>
          <div className="track-metadata">
            <span className="track-artist">{details.artist}</span>
            <span className="separator">•</span>
            <span className="play-count">
              {formatPlays(details.plays || 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="song-actions">
        {isHovered && (
          <div className="action-buttons">
            <button className="action-btn heart-btn">
              <MuzaIcon iconName="heart" />
            </button>
            <button className="action-btn menu-btn">
              <MuzaIcon iconName="ellipsis" />
            </button>
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="song-checkbox"
                checked={isSelected}
                onChange={(e) => setIsSelected(e.target.checked)}
              />
            </div>
          </div>
        )}

        {!isHovered && (
          <div className="duration">
            {details.time ? formatDuration(details.time) : "00:00"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongDetails;
