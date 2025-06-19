import React from "react";
import "./AlbumArtist.scss";

type AlbumArtistProps = {
  imageSrc: string;
  artistName: string;
  albumsCount: number;
  onAlbumSelected?: (details: {
    artistName: string;
    albumsCount: number;
    imageSrc: string;
  }) => void;
};

export const AlbumArtist: React.FC<AlbumArtistProps> = ({
  imageSrc,
  artistName,
  albumsCount,
  onAlbumSelected,
}) => {
  const handleTrackClick = () => {
    if (onAlbumSelected) {
      onAlbumSelected({
        artistName,
        albumsCount,
        imageSrc,
      });
    }
  };

  return (
    <div className="album-artist" onClick={handleTrackClick}>
      <div className="image-container">
        <img src={imageSrc} alt={artistName} />
      </div>
      <h3 dangerouslySetInnerHTML={{ __html: artistName }} />
      <p>{albumsCount} Albums</p>
    </div>
  );
};
