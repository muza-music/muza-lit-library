import React, { type MouseEventHandler, useState } from "react";
import "./SongLine.css";
import type { SongDetails } from "../../appData/models";
import { formatSongNumber } from "../../appData/utils";
import MuzaIcon from "../../icons/MuzaIcon";

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
  const [isHovering, setIsHovering] = useState(false);

  const renderPlayingIndicator = () => {
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
      <span className="play-icon">
        <i className="fa-solid fa-play"></i>
      </span>
    );
  };

  const renderHoverIcon = () => {
    if (details.isPlaying) {
      return (
        <MuzaIcon
          iconName="Pause"
          className="hover-icon pause-icon"
          svgStyle={{ width: "24px", height: "24px" }}
        />
      );
    }

    return (
      <MuzaIcon
        iconName="Play"
        className="hover-icon play-icon"
        svgStyle={{ width: "24px", height: "24px" }}
      />
    );
  };

  // Render the action buttons that appear on hover
  const renderActionButtons = () => {
    return (
      <div className="action-buttons">
        <button className="action-button">
          <MuzaIcon
            iconName="Heart"
            className="heart-icon"
            svgStyle={{ width: "16px", height: "16px" }}
          />
        </button>
        <button className="action-button">
          <MuzaIcon
            iconName="Ellipsis"
            className="ellipsis-icon"
            svgStyle={{ width: "16px", height: "16px" }}
          />
        </button>
        <button className="action-button checkbox-container">
          <MuzaIcon
            iconName="Checkbox"
            className="checkbox-icon"
            svgStyle={{ width: "16px", height: "16px" }}
          />
        </button>
      </div>
    );
  };

  return (
    <div
      className="song-line"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="song-container">
        <div className="song-content">
          {details.imageSrc ? (
            <div className="cover-art-container">
              <img
                src={details.imageSrc}
                alt={`${details.title} cover art`}
                className="cover-art"
              />
              {details.isPlaying && (
                <div className="playing-indicator">
                  {renderPlayingIndicator()}
                </div>
              )}
              {isHovering && (
                <div className="hover-indicator">{renderHoverIcon()}</div>
              )}
            </div>
          ) : (
            <div className="track-info-number">
              {isHovering ? (
                <span className="play-icon visible">
                  {details.isPlaying ? (
                    <MuzaIcon
                      iconName="Pause"
                      className="hover-icon pause-icon"
                      svgStyle={{ width: "24px", height: "24px" }}
                    />
                  ) : (
                    <MuzaIcon
                      iconName="Play"
                      className="hover-icon play-icon"
                      svgStyle={{ width: "24px", height: "24px" }}
                    />
                  )}
                </span>
              ) : details.isPlaying ? (
                renderPlayingIndicator()
              ) : (
                <span className="track-number">
                  {formatSongNumber(details.index || 1)}
                </span>
              )}
            </div>
          )}
          <div className="track-info-content">
            <span className="track-title">{details.title}</span>
            {details.artist && (
              <div className="track-metadata">
                <span className="track-artist">{details.artist}</span>
                {details.album && (
                  <>
                    <span className="separator">•</span>
                    <span className="track-album">{details.album}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {isHovering ? (
          renderActionButtons()
        ) : (
          <span className="track-duration">
            {details.time ? formatDuration(details.time) : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default SongLine;
