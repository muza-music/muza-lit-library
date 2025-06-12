import React from "react";
import "./MusicListSection.css";
import AlbumDetails from "../albumDisplays/AlbumDetails";
import { AlbumArtist } from "../albumDisplays/AlbumArtist";
import PlaylistCover from "../albumDisplays/PlaylistCover";
import type { MusicListSection, Album } from "~/appData/models";

const MusicListSection: React.FC<MusicListSection & { 
  onAlbumClick?: (album: Album) => void;
  albums?: Album[];
}> = ({
  title,
  subTitle,
  type,
  list,
  onShowAll,
  onAlbumClick,
  albums,
}) => {
  const handleShowAll = () => {
    if (onShowAll) {
      onShowAll(title);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "album":
        return albums!.map((album) => (
          <AlbumDetails
            key={album.id}
            details={album}
            onAlbumClick={() => onAlbumClick?.(album)}
          />
        ));
      case "artist":
        return list.map((item, idx) => (
          <AlbumArtist
            key={idx}
            imageSrc={item.imageSrc}
            artistName={item.artistName || ""}
            albumsCount={item.albumsCount || 1}
          />
        ));
      case "playlist":
        return list.map((item, idx) => (
          <PlaylistCover
            key={idx}
            imageSrc={item.imageSrc}
            title={item.title}
            songsCount={item.songsCount?.toString() || ""}
          />
        ));
      default:
        return null;
    }
  };

  // Determine the appropriate CSS class based on type
  const getContentClass = () => {
    switch (type) {
      case "album":
        return "album-list";
      case "artist":
        return "artist-list";
      case "playlist":
        return "album-list"; // Use album-list styling for playlists
      default:
        return "album-list";
    }
  };

  return (
    <div className="music-list-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{title}</h2>
        <button className="show-more-btn" onClick={handleShowAll}>
          Show more
        </button>
      </div>
      {subTitle && <p>{subTitle}</p>}
      <div className={getContentClass()}>{renderContent()}</div>
    </div>
  );
};

export default MusicListSection;
