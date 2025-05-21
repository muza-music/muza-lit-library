import React from "react";
// import "./SongList.css";
import type { SongDetails } from "../../appData/models";
import SongLine from "../songLineDisplays/SongLine";

interface SongListProps {
  songs: SongDetails[];
  title?: string;
  onSelectSong: (song: SongDetails) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, title, onSelectSong }) => {
  return (
    <div className="song-list">
      {title && <h2 className="list-title">{title}</h2>}
      <div className="song-list-container">
        {songs.map((song, index) => {
          const songWithIndex = { ...song, index: index + 1 };
          return (
            <SongLine
              key={song.id || index}
              details={songWithIndex}
              onClick={() => onSelectSong(song)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SongList;
