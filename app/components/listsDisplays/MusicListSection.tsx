import React from "react";
import "./MusicListSection.css";
import AlbumCover from "../albumDisplays/AlbumCover";
import { AlbumArtist } from "../albumDisplays/AlbumArtist";
import PlaylistCover from "../albumDisplays/PlaylistCover";
import type { MusicListSection } from "~/appData/models";

const MusicListSection: React.FC<MusicListSection> = ({
  title,
  subTitle,
  type,
  list,
  onShowAll,
}) => {
  const handleShowAll = () => {
    if (onShowAll) {
      onShowAll(title);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "album":
        return list.map((item, idx) => (
          <AlbumCover
            key={idx}
            imageSrc={item.imageSrc}
            title={item.title}
            subTitle={item.subTitle || ""}
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

  return (
    <div className="music-list-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="section-button" onClick={handleShowAll}>
          Show All
        </button>
      </div>
      {subTitle && <p>{subTitle}</p>}
      <div className="section-content">
        <div className="content-items">{renderContent()}</div>
      </div>
    </div>
  );
};

export default MusicListSection;
