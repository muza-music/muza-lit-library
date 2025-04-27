import React from "react";
import "./AlbumCover.css";

interface AlbumCoverProps {
  imageSrc: string;
  title: string;
  subTitle: string;
  onAlbumSelect?: (data: {
    title: string;
    subTitle: string;
    imageSrc: string;
  }) => void;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({
  imageSrc,
  title,
  subTitle,
  onAlbumSelect,
}) => {
  const handleClick = () => {
    if (onAlbumSelect) {
      onAlbumSelect({ title, subTitle, imageSrc });
    }
  };

  return (
    <div className="album-cover" onClick={handleClick}>
      <div className="image-container">
        <img src={imageSrc} alt={title} />
        <div className="play-overlay">
          <div className="play-button"></div>
        </div>
      </div>
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{subTitle}</p>
    </div>
  );
};

export default AlbumCover;
