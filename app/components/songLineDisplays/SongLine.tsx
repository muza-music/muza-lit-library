import React, { type MouseEventHandler, useState } from "react";
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
        <svg className="hover-icon pause-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="4" width="4" height="16" fill="white"/>
          <rect x="14" y="4" width="4" height="16" fill="white"/>
        </svg>
      );
    }
    
    return (
      <svg className="hover-icon play-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7z" fill="white"/>
      </svg>
    );
  };

  // Render the action buttons that appear on hover
  const renderActionButtons = () => {
    return (
      <div className="action-buttons">
        <button className="action-button">
          <svg className="heart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="action-button">
          <svg className="ellipsis-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="6" cy="12" r="1.5" fill="currentColor" />
            <circle cx="18" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </button>
        <button className="action-button checkbox-container">
          <svg className="checkbox-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          </svg>
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
              {details.isPlaying && <div className="playing-indicator">{renderPlayingIndicator()}</div>}
              {isHovering && <div className="hover-indicator">{renderHoverIcon()}</div>}
            </div>
          ) : (
            <div className="track-info-number">
              {isHovering ? (
                <span className="play-icon visible">
                  {details.isPlaying ? (
                    <svg className="hover-icon pause-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                      <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                    </svg>
                  ) : (
                    <i className="fa-solid fa-play"></i>
                  )}
                </span>
              ) : (
                details.isPlaying ? (
                  renderPlayingIndicator()
                ) : (
                  <span className="track-number">
                    {formatSongNumber(details.index || 1)}
                  </span>
                )
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