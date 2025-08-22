import React from "react";
import "./AlbumCover.scss";
import HoverOverlay from "~/components/ui/HoverOverlay";

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
        <HoverOverlay
          showPlayButton={true}
          onPlayPause={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        />
      </div>
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{subTitle}</p>
    </div>
  );
};

export default AlbumCover;
