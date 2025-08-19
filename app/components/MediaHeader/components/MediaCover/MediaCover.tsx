import React from "react";
import "./MediaCover.scss";

interface MediaCoverProps {
  imageSrc: string;
  title: string;
  mediaType?: "album" | "playlist" | "artist";
  size?: "small" | "medium" | "large";
}

const MediaCover: React.FC<MediaCoverProps> = ({
  imageSrc,
  title,
  mediaType = "album",
  size = "large",
}) => {
  return (
    <div className={`cover-section cover-section--${size}`} data-name="cover">
      <div className="cover-frame" data-name="cover frame">
        <img src={imageSrc} alt={title} />
        <div className="overlay" data-name="Overlay" />
      </div>
    </div>
  );
};

export default MediaCover;
