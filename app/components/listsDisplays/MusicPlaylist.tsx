import React from "react";
import "./MusicPlaylist.scss";
import type { MusicPlaylist, SongDetails } from "../../appData/models";
import SmallAlbumDetails from "../albumDisplays/SmallAlbumDetails";
import MuzaButton from "~/controls/MuzaButton";
import PlaylistItem from "../songLineDisplays/PlaylistItem";
import MusicSuggestionsList from "./MusicSuggestionsList";

const MuzaMusicPlaylist: React.FC<MusicPlaylist> = ({
  title,
  author,
  imageSrc = "",
  songs,
  suggestions,
}) => {
  const sideMode = "side";

  const getImageSrc = () => {
    return imageSrc.length > 0 ? imageSrc : songs[0]?.imageSrc || "";
  };

  return (
    <div className={`content ${sideMode}`}>
      <div className="top">
        <div className="buttons">
          <MuzaButton content="x" />
          <MuzaButton content="&#xf065;" />
        </div>
        <SmallAlbumDetails
          imageSrc={getImageSrc()}
          title={title}
          author={author || "Unknown"}
        />
      </div>

      <div className="playlist">
        <div className="songs-list">
          {songs.map((song, idx) => (
            <PlaylistItem key={idx} details={song} />
          ))}
        </div>
      </div>

      <MusicSuggestionsList title="Suggestions" songs={suggestions || []} />
    </div>
  );
};

export default MuzaMusicPlaylist;
