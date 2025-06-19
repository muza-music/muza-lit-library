import React from "react";
import AlbumCover from "./AlbumCover";
import "./PlaylistCover.scss";

interface PlaylistCoverProps {
  imageSrc: string;
  title: string;
  songsCount: string;
  onSelect?: (data: {
    title: string;
    songsCount: string;
    imageSrc: string;
  }) => void;
}

const PlaylistCover: React.FC<PlaylistCoverProps> = ({
  imageSrc,
  title,
  songsCount,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect?.({ title, songsCount, imageSrc });
  };

  return (
    <div onClick={handleClick}>
      <AlbumCover
        imageSrc={imageSrc}
        title={`<icon-playlist></icon-playlist> ${title}`}
        subTitle={`${songsCount} Songs`}
      />
    </div>
  );
};

export default PlaylistCover;
