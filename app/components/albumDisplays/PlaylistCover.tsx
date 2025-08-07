import React from "react";
import "./PlaylistCover.scss";

interface PlaylistCoverProps {
  albumImages: string[]; // Array of 4 album cover images
  title: string;
  songsCount: string;
  userName: string;
  onSelect?: (data: {
    title: string;
    songsCount: string;
    albumImages: string[];
    userName: string;
  }) => void;
}

const PlaylistCover: React.FC<PlaylistCoverProps> = ({
  albumImages,
  title,
  songsCount,
  userName,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect?.({ title, songsCount, albumImages, userName });
  };

  // Ensure we have 4 images, pad with first image if needed
  const safeAlbumImages = Array.isArray(albumImages) ? albumImages : [];
  const paddedImages = [...safeAlbumImages];
  while (paddedImages.length < 4) {
    paddedImages.push(paddedImages[0] || "");
  }

  return (
    <div className="playlist-cover" onClick={handleClick}>
      <div className="playlist-cover__image-container">
        <div className="playlist-cover__collage">
          <div
            className="playlist-cover__image playlist-cover__image--top-left"
            style={{ backgroundImage: `url('${paddedImages[0]}')` }}
          />
          <div
            className="playlist-cover__image playlist-cover__image--top-right"
            style={{ backgroundImage: `url('${paddedImages[1]}')` }}
          />
          <div
            className="playlist-cover__image playlist-cover__image--bottom-left"
            style={{ backgroundImage: `url('${paddedImages[2]}')` }}
          />
          <div
            className="playlist-cover__image playlist-cover__image--bottom-right"
            style={{ backgroundImage: `url('${paddedImages[3]}')` }}
          />
        </div>
      </div>
      <div className="playlist-cover__info">
        <div className="playlist-cover__title">{title}</div>
        <div className="playlist-cover__details">
          <span className="playlist-cover__songs-count">
            {songsCount} Songs
          </span>
          <span className="playlist-cover__separator">•</span>
          <span className="playlist-cover__user-name">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCover;
