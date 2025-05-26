import React, { type MouseEventHandler } from "react";
import "./SongLine.css";
import type { SongDetails } from "../../appData/models";
import { formatSongNumber } from "../../appData/utils";
import MuzaIcon from "../../icons/MuzaIcon";

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

  const renderPlayingIndicator = () => {
    if (isPlaying) {
      return (
        <div className="wave-container">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      );
    }
    return null;
  };

  const renderHoverIcon = (color: string) => {
    if (isPlaying) {
      return (
        <MuzaIcon
          iconName={color === "filled" ? "pause" : "pauseWhite"}
          className="hover-icon pause-icon"
          svgStyle={{ width: "24px", height: "24px" }}
        />
      );
    }
    return (
      <MuzaIcon
        iconName={color === "filled" ? "play" : "playWhite"}
        className="hover-icon play-icon"
        svgStyle={{ width: "24px", height: "24px" }}
      />
    );
  };

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
    <div className={isPlaying ? "song-line playing-song-line" : "song-line"} onClick={onClick}>
      <div className="song-container">
        <div className="song-content">
          {details.imageSrc ? (
            <div className="cover-art-container">
              <img
                src={details.imageSrc}
                alt={`${details.title} cover art`}
                className="cover-art"
              />
              {isPlaying && (
                <div className="playing-indicator">
                  {renderPlayingIndicator()}
                </div>
              )}
              <div className="hover-indicator">
                {renderHoverIcon(details.imageSrc ? "" : "filled")}
              </div>
            </div>
          ) : (
            
            <div className="track-info-number">
              {renderHoverIcon(details.imageSrc ? "" : "filled")}
              {!isPlaying &&
              <span className="track-number">

                 {formatSongNumber(details.index || 1)}
              </span>
              }

            </div>
          )}
          <div className="track-info-content">
            <span className={isPlaying ? "track-title-playing" : "track-title"}>{details.title}</span>
            {details.artist && (
              <div className="track-metadata">
                <span className="track-artist">{details.artist}</span>
                {details.playsNumber && (
                  <>
                    <span className="separator">•</span>
                    <span className="track-album">{details.playsNumber.toLocaleString() + " Plays"}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {renderActionButtons()}
        <span className="track-duration">
          {details.time ? formatDuration(details.time) : ""}
        </span>
      </div>
    </div>
  );
};

export default SongLine;
