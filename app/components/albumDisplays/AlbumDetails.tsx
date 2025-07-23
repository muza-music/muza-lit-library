import React from "react";
import "./AlbumDetails.scss";
import type { Album } from "~/appData/models";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import MuzaIcon from "~/icons/MuzaIcon";

interface AlbumDetailsProps {
  details: Album;
  onAlbumClick: () => void;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  details,
  onAlbumClick,
}) => {
  const { isPlaying, setIsPlaying } = useCurrentPlayerStore();

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="album-details-card">
      <div className="image-container">
        <img
          src={details.imageSrc}
          alt={details.title}
          onClick={onAlbumClick}
        />
        <div className="album-hover-overlay">
          <div className="album-overlay-actions">
            <button className="album-overlay-btn"><MuzaIcon iconName="dots" /></button>
            <button className="album-overlay-btn"><MuzaIcon iconName="info" /></button>
            <button className="album-overlay-btn"><MuzaIcon iconName="plus" /></button>
          </div>
        </div>
        <button
          className="album-play-pause-btn"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <MuzaIcon iconName="pause" />
          ) : (
            <MuzaIcon iconName="play-hover" />
          )}
        </button>
      </div>
      <div className="info">
        <div className="title">{details.title}</div>
        <div className="artist">{details.artist}</div>
        <div className="subtitle">{details.genre && `${details.genre} • `}</div>
        <div className="buttons">
          <button className="icon-button">
            <MuzaIcon iconName="dots" />
          </button>
          <button className="icon-button">
            <MuzaIcon iconName="info" />
          </button>
          <button className="icon-button">
            <MuzaIcon iconName="plus" />
          </button>
          <button className="icon-button">
            <MuzaIcon iconName="shuffle" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
