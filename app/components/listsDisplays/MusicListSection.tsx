import React from "react";
import "./MusicListSection.css";
import MuzaCover from "../albumDisplays/MuzaCover";
import { AlbumArtist } from "../albumDisplays/AlbumArtist";

interface MusicListItem {
  imageSrc: string;
  title: string;
  subTitle?: string;
  artistName?: string;
  songsCount?: number;
  albumsCount?: number;
}

type MusicListSectionProps = {
  title: string;
  subTitle?: string;
  type: "album" | "artist" | "playlist";
  list: MusicListItem[];
  onShowAll?: (sectionTitle: string) => void;
};

const MusicListSection: React.FC<MusicListSectionProps> = ({
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
          <MuzaCover
            key={idx}
            imageSrc={item.imageSrc}
            title={item.title}
            subTitle={item.subTitle || ""}
            type="album"
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
          <MuzaCover
            key={idx}
            imageSrc={item.imageSrc}
            title={item.title}
            subTitle={item.subTitle || ""}
            type="playlist"
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
