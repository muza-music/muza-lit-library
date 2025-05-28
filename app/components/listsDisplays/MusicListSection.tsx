import React from "react";
import PlaylistCover from "../albumDisplays/PlaylistCover";
import type { MusicListSectionType } from "~/appData/models";
import ArtistDetails from "~/components/artistDisplays/ArtistDetails";
import AlbumDetails from "../albumDisplays/AlbumDetails";
import "../../styles/main.css";
// import "./MusicListSection.css";

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
        return (
          <div className="album-list">
            {list.map((a: any) => (
              <AlbumDetails key={a.id} details={a} />
            ))}
          </div>
        );
      case "artist":
        return (
          <div className="album-list">
            {list.map((artist: any) => (
              <ArtistDetails key={artist.id} details={artist} />
            ))}
          </div>
        );
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
    <>
      <hr />
      <h2>New Releases</h2>
      {renderContent()}
    </>
  );
};

export default MusicListSection;
