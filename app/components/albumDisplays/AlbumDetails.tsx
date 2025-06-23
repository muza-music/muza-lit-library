import React from "react";
import "./AlbumDetails.scss";
import type { Album } from "~/appData/models";

interface AlbumDetailsProps {
  details: Album;
  onAlbumClick: () => void;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  details,
  onAlbumClick,
}) => {
  return (
    <div className="album-details-card">
      <div className="image-container">
        <img
          src={details.imageSrc}
          alt={details.title}
          onClick={onAlbumClick}
        />
      </div>
      <div className="info">
        <div className="title">{details.title}</div>
        <div className="artist">{details.artist}</div>
        <div className="subtitle">{details.genre && `${details.genre} • `}</div>
        <div className="buttons">
          <button className="icon-button">
            <span className="icon icon-dots" />
          </button>
          <button className="icon-button">
            <span className="icon icon-info" />
          </button>
          <button className="icon-button">
            <span className="icon icon-plus" />
          </button>
          <button className="icon-button">
            <span className="icon icon-shuffle">
              <svg viewBox="0 0 24 24">
                <path d="M16 3h5v5" />
                <path d="M4 20l16-16" />
                <path d="M4 4l5 5" />
                <path d="M21 16v5h-5" />
                <path d="M15 15l6 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
