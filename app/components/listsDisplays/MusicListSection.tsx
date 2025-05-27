import React from "react";
import "./MusicListSection.css";
import AlbumCover from "../albumDisplays/AlbumCover";
import PlaylistCover from "../albumDisplays/PlaylistCover";
import type { Album, MusicListSectionType } from "~/appData/models";
import ArtistDetails from "~/components/artistDisplays/ArtistDetails";
import AlbumDetails from "../albumDisplays/AlbumDetails";


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
        return (list as Album[]).map((album, idx) => (
          <AlbumDetails
            key={idx}
            details={album} 
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
    // <div className="music-list-section">
    //   <div className="section-header">
    //     <h2>{title}</h2>
    //     <button className="section-button" onClick={handleShowAll}>
    //       Show All
    //     </button>
    //   </div>
    //   {subTitle && <p>{subTitle}</p>}
    //   <div className="section-content">
    //     <div className="content-items">{renderContent()}</div>
    //   </div>
    // </div>
    <>
          <hr />
          <h2>New Releases</h2>
          <div className="album-list">
               <div className="content-items">{renderContent()}</div>

          </div>
    </>
  );
};

export default MusicListSection;
