import React, { type MouseEventHandler, useState } from "react";
import "./SongLineWithCover.scss";
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

const formatPlayCount = (plays: number): string => {
  if (plays < 1000) return plays.toString();
  if (plays < 1000000) return `${(plays / 1000).toFixed(1)}K`;
  return `${(plays / 1000000).toFixed(1)}M`;
};

const SongLineWithCover: React.FC<SongLineProps> = ({
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
      className={`song-line-with-cover ${isPlaying ? "playing" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-line__content">
        {/* Album Cover */}
        <div className="song-line__cover">
          <img
            src={details.imageSrc || "/art/imag_1.jpg"}
            alt={`${details.title} cover`}
            className="cover-image"
          />
          {isHovered && (
            <div className="play-overlay">
              <button
                className="play-button"
                onClick={(e) => {
                  e.stopPropagation();
                  // Create a synthetic event that matches the expected type
                  const syntheticEvent = e as any;
                  onClick(syntheticEvent);
                }}
              >
                <MuzaIcon iconName={isPlaying ? "pause" : "play"} />
              </button>
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="song-line__info">
          <div className="song-line__title-row">
            <h3 className="song-title">{details.title}</h3>
          </div>

          <div className="song-line__details-row">
            <div className="song-details">
              <span className="artist-name">{details.artist}</span>
              <span className="separator">•</span>
              <span className="album-name">
                {details.album || "Unknown Album"}
              </span>
              <span className="separator">•</span>
              <span className="play-count">
                {details.plays ? formatPlayCount(details.plays) : "0"} Plays
              </span>
            </div>
          </div>
        </div>

        {/* Right Section with Gradient */}
        <div className="song-line__actions">
          {isHovered && (
            <button
              className="ellipsis-btn"
              title="More options"
              onClick={(e) => {
                e.stopPropagation();
                // Handle more options
              }}
            >
              <MuzaIcon iconName="ellipsis" />
            </button>
          )}

          <button
            className="add-btn"
            title="Add to library"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to library
            }}
          >
            <MuzaIcon iconName="plus" />
          </button>

          <span className="duration">
            {details.time ? formatDuration(details.time) : "00:00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongLineWithCover;
