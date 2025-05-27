import React from "react";
import "./MusicListSection.css";
import AlbumCover from "../albumDisplays/AlbumCover";
import PlaylistCover from "../albumDisplays/PlaylistCover";
import type { MusicListSectionType } from "~/appData/models";
import ArtistDetails from "~/components/artistDisplays/ArtistDetails";


const MusicListSection: React.FC<MusicListSectionType> = ({
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
        return <div className="album-list">
        {list.map((artist: any) => (
          <ArtistDetails key={artist.id} details={artist} />
        ))}
      </div>
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
